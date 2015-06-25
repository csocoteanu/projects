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

namespace TaskAssignmentService.DB
{
    public enum eLogSeverity
    {
        kError,
        kInfo,
        kDebug,
        kAll
    }

    public class TaskAssignmentServiceLogger
    {
        private static TaskAssignmentServiceLogger m_instance = null;
        private static object m_lock = new object();

        private TaskAssignmentServiceLogger()
        {
            this.Severity = eLogSeverity.kError;
        }

        public static TaskAssignmentServiceLogger Instance
        {
            get
            {
                if (m_instance == null)
                {
                    lock (m_lock)
                    {
                        if (m_instance == null)
                            m_instance = new TaskAssignmentServiceLogger();
                    }
                }

                return m_instance;
            }
        }

        public eLogSeverity Severity { get; set; }

        public void Log(eLogSeverity severity, string message)
        {
            lock (this)
            {
                if (severity > this.Severity)
                    return;

                Console.WriteLine(string.Format("[{0}]\t{1}", severity.ToString(), message)); 
            }
        }

        public void Log(eLogSeverity eLogSeverity, Exception ex)
        {
            string message = string.Format("ERR: {0} @ {1}", ex.Message, ex.StackTrace);
            this.Log(eLogSeverity, message);
        }
    }
}
