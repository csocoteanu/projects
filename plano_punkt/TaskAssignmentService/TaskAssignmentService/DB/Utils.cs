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
using System.Collections;

namespace TaskAssignmentService.DB
{
    public static class Utils
    {
        public static string Join(this IEnumerable i_collection, string i_separator)
        {
            string joinedString = string.Empty;
            foreach (var item in i_collection)
            {
                joinedString += item.ToString() + ", ";
            }
            return joinedString.Substring(0, joinedString.Length - 2);
        }

        public static string ToSQLDate(this DateTime i_dateTime)
        {
            return i_dateTime.ToString("yyyy-MM-dd HH:mm:ss");
        }
    }
}
