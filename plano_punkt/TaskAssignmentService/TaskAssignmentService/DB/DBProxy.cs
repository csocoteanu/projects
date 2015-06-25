using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Data.Odbc;
using System.Collections.Generic;
using System.Collections;

namespace TaskAssignmentService.DB
{
    public interface IDBResult { }
    public class DBInts : List<int>, IDBResult { }

    public class DBConnection : IDisposable
    {

        private static DBConnection ms_instance;

        private string m_dbIP;
        private int m_dbPort;
        private string m_dbName;
        private string m_dbUser;
        private string m_dbPwd;

        public static DBConnection Instance
        {
            get
            {
                if (ms_instance == null)
                    ms_instance = new DBConnection("localhost", 3306, "plano", "root", "root");
                return ms_instance;
            }
        }

        public OdbcConnection ODBCConnection { get; private set; }

        private DBConnection(string i_ip, int i_port,
                              string i_dbName,
                              string i_user, string i_pwd)
        {
            m_dbIP = i_ip; m_dbPort = i_port;
            m_dbName = i_dbName;
            m_dbUser = i_user; m_dbPwd = i_pwd;

            this.ODBCConnection = new System.Data.Odbc.OdbcConnection("DRIVER={MySQL ODBC 5.3 ANSI Driver};" +
                                                                 string.Format("SERVER={0};", m_dbIP) +
                                                                 string.Format("PORT={0};", m_dbPort) +
                                                                 string.Format("DATABASE={0};", m_dbName) +
                                                                 string.Format("USER={0};", m_dbUser) +
                                                                 string.Format("PASSWORD={0};", m_dbPwd) + 
                                                                 "OPTION=3;");
            this.ODBCConnection.Open();
        }

        #region IDisposable Members

        public void Dispose()
        {
            this.ODBCConnection.Close();
            this.ODBCConnection.Dispose();
        }

        #endregion
    }

    public class DBSelectCommand<T> : DBCommand<T>
        where T : DBEntity
    {
        private string m_fields = "*";
        private string m_fromTables = string.Empty;
        private string m_where = string.Empty;
        private string m_orderBy = string.Empty;
        private string m_limit = string.Empty;
        private string m_offset = string.Empty;

        public override string CommandID { get { return "SELECT"; } }

        public DBSelectCommand(DBConnection i_connection) : base(i_connection) { }

        public DBSelectCommand<T> What(params string[] i_fields)
        {
            m_fields = string.Join(",", i_fields);
            return this;
        }

        public DBSelectCommand<T> From(params string[] i_tables)
        {
            m_fromTables = "FROM " + string.Join(",", i_tables);
            return this;
        }

        public DBSelectCommand<T> Where(string i_columnName, string i_operator, string i_value)
        {
            m_where = "WHERE " + string.Format("{0} {1} {2}", i_columnName, i_operator, i_value);
            return this;
        }

        public DBSelectCommand<T> OrderBy(string i_field)
        {
            m_orderBy = string.Format("ORDER BY {0}", i_field);
            return this;
        }

        public DBSelectCommand<T> Limit(int i_limit)
        {
            m_limit = string.Format("LIMIT {0}", i_limit);
            return this;
        }

        public DBSelectCommand<T> Offset(int i_offset)
        {
            m_offset = string.Format("OFFSET {0}", i_offset);
            return this;
        }

        public override string  ToString()
        {
            return string.Format("{0} {1} {2} {3} {4} {5} {6}", this.CommandID, m_fields, m_fromTables, m_where, m_orderBy, m_limit, m_offset);
        }

        public override IDBResult OnExecute(OdbcCommand i_command, Type entityType)
        {
            return DBEntity.CreateDBEntitites(i_command.ExecuteReader(), entityType);
        }
    }

    public class DBInsertCommand<T> : DBCommand<T>
        where T : DBEntity
    {
        private string m_tableName = string.Empty;
        private string m_columns = string.Empty;
        private string m_values = string.Empty;

        public DBInsertCommand(DBConnection i_connection, T i_entity)
            : base(i_connection)
        {
            BuildCommand(i_entity);
        }

        private void BuildCommand(DBEntity i_dbEntity)
        {
            this.Into(i_dbEntity.GetTableName()).Columns(i_dbEntity.GetColumns()).Values(i_dbEntity.GetDBValues());
        }

        public override string CommandID { get { return "INSERT"; } }

        public DBInsertCommand<T> Into(string i_tableName)
        {
            m_tableName = i_tableName;
            return this;
        }

        public DBInsertCommand<T> Columns(IEnumerable i_columns)
        {
            m_columns = string.Format("({0})", i_columns.Join(","));
            return this;
        }

        public DBInsertCommand<T> Values(IEnumerable i_values)
        {
            m_values = "VALUES " + string.Format("({0})", i_values.Join(","));
            return this;
        }

        public override string ToString()
        {
            return string.Format("{0} INTO {1} {2} {3}", this.CommandID, this.m_tableName, this.m_columns, this.m_values);
        }

        public override IDBResult OnExecute(OdbcCommand i_command, Type entityType)
        {
            int rows = i_command.ExecuteNonQuery();
            DBInts integers = new DBInts(); integers.Add(rows);
            return integers;
        }
    }

    public abstract class DBCommand<T>
        where T : DBEntity
    {
        protected DBConnection m_dbConnection = null;

        public DBCommand(DBConnection i_connection)
        {
            this.m_dbConnection = i_connection;
        }

        public abstract string CommandID { get; }
        public abstract IDBResult OnExecute(OdbcCommand i_command, Type entityType);

        public virtual IDBResult Execute()
        {
            TaskAssignmentServiceLogger.Instance.Log(eLogSeverity.kDebug, "Executing..." + this);
            OdbcCommand command = null;
            OdbcDataReader cmdReader = null;
            IDBResult result = null;

            try
            {
                command = new OdbcCommand(this.ToString(), m_dbConnection.ODBCConnection);
                result = this.OnExecute(command, typeof(T));

                TaskAssignmentServiceLogger.Instance.Log(eLogSeverity.kDebug, "Succesfully executed..." + this);
            }
            catch (Exception ex)
            {
                TaskAssignmentServiceLogger.Instance.Log(eLogSeverity.kError, "Failed executing..." + this +
                                                                              " -> " + ex.Message + "@" + ex.StackTrace);
            }
            finally
            {
                if (cmdReader != null)
                {
                    cmdReader.Close();
                    cmdReader.Dispose();
                }
                if (command != null)
                    command.Dispose(); 
            }

            return result;
        }

        public static IDBResult ExecuteMultipleCommands(DBConnection i_dbConnection, IEnumerable<DBCommand<T>> i_collection)
        {
            string sqlCommands = i_collection.Join("; ");
            OdbcCommand command = null;
            OdbcDataReader cmdReader = null;
            IDBResult result = null;

            try
            {
                TaskAssignmentServiceLogger.Instance.Log(eLogSeverity.kDebug, "Executing bulk..." + sqlCommands);
                command = new OdbcCommand(sqlCommands, i_dbConnection.ODBCConnection);
                int rows = command.ExecuteNonQuery();

                DBInts affectedRows = new DBInts(); affectedRows.Add(rows);
                result = affectedRows;
            }
            catch (Exception ex)
            {
                TaskAssignmentServiceLogger.Instance.Log(eLogSeverity.kError, ex);
            }
            finally
            {
                if (cmdReader != null)
                {
                    cmdReader.Close();
                    cmdReader.Dispose();
                }
                if (command != null)
                    command.Dispose();
            }

            return result;
        }
    }

    public class DBProxy
    {
        private static DBProxy m_instance = null;
        private static object m_lock = null;

        private DBConnection m_dbConnection;
        public DBEntities Groups {get; private set; }
        public DBEntities Activities {get; private set; }
        public DBEntities GroupActivities {get; private set; }

        static DBProxy()
        {
            m_lock = new object();
        }

        private DBProxy()
        {
            m_dbConnection = DBConnection.Instance;
            GetAllDBObjects();
        }

        public static DBProxy Instance
        {
            get
            {
                if (m_instance == null)
                {
                    lock (m_lock)
                    {
                        if (m_instance == null)
                            m_instance = new DBProxy();
                    }
                }

                return m_instance;
            }
        }

        private void GetAllDBObjects()
        {
            this.Groups = (DBEntities)new DBSelectCommand<DBGroup>(m_dbConnection).What("*").From("groups").Execute();
            this.Activities = (DBEntities)new DBSelectCommand<DBActivity>(m_dbConnection).What("*").From("activities").Execute();
            this.GroupActivities = (DBEntities)new DBSelectCommand<DBGroup_x_Activity>(m_dbConnection).What("*").From("group_x_activity").Execute();
        }

        public int AddEmployeeCount(int i_groupID, int i_activityID, int i_employeeCount)
        {
            try
            {
                lock (this)
                {
                    string sqlFormattedDate = DateTime.Now.ToSQLDate();
                    DBEmployee_x_Activity employeeOnActivity = null;
                    DBGroup_x_Activity groupActivity = (DBGroup_x_Activity)this.GroupActivities.Values.First
                    (ga =>
                        ((DBGroup_x_Activity)ga).ActivityID == i_activityID &&
                        ((DBGroup_x_Activity)ga).GroupID == i_groupID
                    );

                    employeeOnActivity = new DBEmployee_x_Activity(groupActivity.ID, i_employeeCount, sqlFormattedDate);
                    DBInts ints = (DBInts)new DBInsertCommand<DBEmployee_x_Activity>(m_dbConnection, employeeOnActivity).Execute();
                    return ints[0];
                }
            }
            catch (Exception ex)
            {
                TaskAssignmentServiceLogger.Instance.Log(eLogSeverity.kError,string.Format("====> Not found group_id:{0} and activity_id:{1}", i_groupID, i_activityID));
                TaskAssignmentServiceLogger.Instance.Log(eLogSeverity.kError, ex);
                return 0;
            }
        }

        public IDBResult GetTaskAssignments(DateTime t1, DateTime t2, int page, int pageSize)
        {
            try
            {
                lock (this)
                {
                    string sqlT1 = t1.ToSQLDate(), sqlT2 = t2.ToSQLDate();
                    return new DBSelectCommand<DBEmployee_x_Activity>(m_dbConnection)
                        .What("*")
                        .From("employees_x_activities")
                        .Where("insert_time", "between", string.Format("DATE ('{0}') AND DATE ('{1}')", sqlT1, sqlT2))
                        .OrderBy("id")
                        .Limit(pageSize)
                        .Offset((page - 1) * pageSize)
                        .Execute(); 
                }
            }
            catch (Exception ex)
            {
                TaskAssignmentServiceLogger.Instance.Log(eLogSeverity.kError, ex);
                return null;
            }
        }
    }
}
