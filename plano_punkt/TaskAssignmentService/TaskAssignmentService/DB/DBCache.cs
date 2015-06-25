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
using System.Collections.Generic;

namespace TaskAssignmentService.DB
{
    public class DBCache<T>
        where T : DBEntity
    {
        public const int kMaxSize = 1024;

        private Queue<T> m_cache = null;
        private DBConnection m_connection = null;

        public DBCache(DBConnection i_dbConnection)
        {
            m_cache = new Queue<T>(kMaxSize);
        }

        public void Enqueue(T i_item)
        {
            if (m_cache.Count < kMaxSize)
            {
                m_cache.Enqueue(i_item);
            }
            else
            {
                List<DBCommand<T>> bulkInserts = new List<DBCommand<T>>();
                for (T entity = m_cache.Dequeue(); m_cache.Count > 0; )
                {
                    bulkInserts.Add(new DBInsertCommand<T>(m_connection, entity));
                }

                DBCommand<T>.ExecuteMultipleCommands(m_connection, bulkInserts);
            }
        }
    }
}
