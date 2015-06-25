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
    public class DBActivity : DBEntity
    {
        public int ID { get; set; }
        public string ActivityName { get; set; }

        public override string GetTableName()
        {
            throw new NotImplementedException();
        }

        public override Dictionary<string, string> GetDBPropertyMappings()
        {
            return new Dictionary<string, string>()
            {
                {"id", "ID"},
                {"activity_name", "ActivityName"}
            };
        }
    }
}
