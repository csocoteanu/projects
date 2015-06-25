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

namespace TaskAssignmentService.DB
{
    public class DBEmployee_x_Activity : DBEntity
    {
        public int ID { get; set; }
        public int Group_x_ActivityID { get; set; }
        public int EmployeeCount { get; set; }
        public string InsertTime { get; set; }

        public DBEmployee_x_Activity() { }

        public DBEmployee_x_Activity(int i_groupActivityID, int i_employeeCount, string i_insertTime)
        {
            this.Group_x_ActivityID = i_groupActivityID;
            this.EmployeeCount = i_employeeCount;
            this.InsertTime = "'" + i_insertTime + "'";
        }

        private DBGroup_x_Activity m_groupActivity;
        public DBGroup_x_Activity GroupActivity
        {
            get
            {
                if (m_groupActivity == null)
                    m_groupActivity = (DBGroup_x_Activity)DBProxy.Instance.GroupActivities[this.Group_x_ActivityID];
                return m_groupActivity;
            }
        }

        public override string GetTableName()
        {
            return "employees_x_activities";
        }

        public override Dictionary<string, string> GetDBPropertyMappings()
        {
            return new Dictionary<string, string>
            {
                {"id", "ID"},
                {"group_x_activity_id", "Group_x_ActivityID"},
                {"employee_count", "EmployeeCount"},
                {"insert_time", "InsertTime"}
            };
        }
    }
}
