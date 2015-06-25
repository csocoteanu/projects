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
using System.Collections.Generic;
using System.Reflection;
using System.Collections;

namespace TaskAssignmentService.DB
{
    public class DBEntities : Dictionary<int, DBEntity>, IDBResult { }

    public abstract class DBEntity
    {
        public static IDBResult CreateDBEntitites(System.Data.Odbc.OdbcDataReader i_cmdReader, Type i_dbEntityType)
        {
            try
            {
                DBEntities entities = new DBEntities();

                while (i_cmdReader.Read())
                {
                    DBEntity dbEntity = (DBEntity)Activator.CreateInstance(i_dbEntityType);

                    for (int i = 0; i < i_cmdReader.FieldCount; i++)
                    {
                        object dbFieldValue = i_cmdReader[i];
                        string dbFieldName = i_cmdReader.GetName(i);
                        string entityFieldName = dbEntity.GetDBPropertyMappings()[dbFieldName];
                        PropertyInfo propertyInfo = i_dbEntityType.GetProperty(entityFieldName);

                        propertyInfo.SetValue(dbEntity, Convert.ChangeType(dbFieldValue, propertyInfo.PropertyType), null);
                    }

                    entities.Add(int.Parse(i_cmdReader[0].ToString()), dbEntity);
                }

                return entities;
            }
            catch (Exception ex)
            {
                TaskAssignmentServiceLogger.Instance.Log(eLogSeverity.kError, ex);
                return null;
            }
        }

        public abstract string GetTableName();
        public abstract Dictionary<string, string> GetDBPropertyMappings();

        public IEnumerable GetColumns() { return this.GetDBPropertyMappings().Keys; }
        public IEnumerable GetDBValues()
        {
            foreach (string mappedProperty in this.GetDBPropertyMappings().Values)
            {
                var dbValue = this.GetType().GetProperty(mappedProperty)
                                            .GetValue(this, null).ToString();
                yield return dbValue;
            }
        }
    }
}
