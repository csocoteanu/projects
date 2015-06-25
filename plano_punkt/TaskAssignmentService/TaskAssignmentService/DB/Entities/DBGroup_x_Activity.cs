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
    public class DBGroup_x_Activity : DBEntity
    {
        public int ID { get; set; }
        public int GroupID { get; set; }
        public int ActivityID { get; set; }
        public string TimeRaster { get; set; }
        public int MinVal { get; set; }
        public int MaxVal { get; set; }
        public int TargetVal { get; set; }

        private DBGroup m_dbGroup = null;
        public DBGroup DBGroup
        {
            get
            {
                if (m_dbGroup == null)
                    m_dbGroup = (DBGroup)DBProxy.Instance.Groups[this.GroupID];
                return m_dbGroup;
            }
        }

        private DBActivity m_dbActivity = null;
        public DBActivity DBActivity
        {
            get
            {
                if (m_dbActivity == null)
                    m_dbActivity = (DBActivity)DBProxy.Instance.Activities[this.ActivityID];
                return m_dbActivity;
            }
        }

        public override string GetTableName()
        {
            throw new NotImplementedException();
        }

        public override Dictionary<string, string> GetDBPropertyMappings()
        {
            return new Dictionary<string,string>()
            {
                {"id", "ID"},
                {"groups_id", "GroupID"},
                {"activities_id", "ActivityID"},
                {"time_raster", "TimeRaster"},
                {"min_val", "MinVal"},
                {"max_val", "MaxVal"},
                {"target_val", "TargetVal"}
            };
        }
    }
}
