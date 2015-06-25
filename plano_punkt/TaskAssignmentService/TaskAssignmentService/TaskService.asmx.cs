using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Web.UI.MobileControls;
using TaskAssignmentService.DB;
using System.Collections.Generic;

namespace TaskAssignmentService
{
    /// <summary>
    /// Summary description for Service1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class TaskService : System.Web.Services.WebService
    {
        public class ActivityEmployeeCount
        {
            public string ActivityName;
            public string GroupName;
            public int EmployeeCount;
        }

        [WebMethod]
        public string HelloWorld(string input)
        {
            return "Hello World " + input;
        }

        [WebMethod]
        public List<DBGroup> GetAllGroups()
        {
            List<DBGroup> dbGroups = new List<DBGroup>();
            foreach (DBGroup group in DBProxy.Instance.Groups.Values)
                dbGroups.Add(group);
            return dbGroups;
        }

        [WebMethod]
        public List<DBActivity> GetAllActivities()
        {
            List<DBActivity> activities = new List<DBActivity>();
            foreach (DBActivity activity in DBProxy.Instance.Activities.Values)
                activities.Add(activity);
            return activities;
        }

        [WebMethod]
        public List<DBGroup_x_Activity> GetAllGroupActivities()
        {
            List<DBGroup_x_Activity> groupActivities = new List<DBGroup_x_Activity>();
            foreach (DBGroup_x_Activity groupActivity in DBProxy.Instance.GroupActivities.Values)
                groupActivities.Add(groupActivity);
            return groupActivities;
        }

        [WebMethod]
        public int AddEmployeeCount(int i_groupID, int i_activityID, int i_employeeCount)
        {
            return DBProxy.Instance.AddEmployeeCount(i_groupID, i_activityID, i_employeeCount);
        }

        [WebMethod]
        public List<ActivityEmployeeCount> GetTaskAssignments(DateTime t1, DateTime t2, int page, int pageSize)
        {
            List<ActivityEmployeeCount> result = new List<ActivityEmployeeCount>();
            DBEntities employeesOnActivties = (DBEntities)DBProxy.Instance.GetTaskAssignments(t1, t2, page, pageSize);
            foreach (DBEmployee_x_Activity item in employeesOnActivties.Values)
            {
                ActivityEmployeeCount empCount = new ActivityEmployeeCount();
                empCount.ActivityName = item.GroupActivity.DBActivity.ActivityName;
                empCount.GroupName = item.GroupActivity.DBGroup.GroupName;
                empCount.EmployeeCount = item.EmployeeCount;

                result.Add(empCount);
            }

            return result;
        }
    }
}
