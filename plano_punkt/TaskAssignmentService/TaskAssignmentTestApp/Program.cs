using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TaskAssignmentService;
using System.Threading;
using TaskAssignmentService.DB;

namespace TaskAssignmentTestApp
{
    class Program
    {
        static int ms_ActivityCount = 0;
        static object ms_lock = new object();

        private static void PopulateDB()
        {
            int cpuCount = Environment.ProcessorCount;
            Thread[] threadPool = new Thread[cpuCount];

            ms_ActivityCount = 0;

            for (int i = 0; i < threadPool.Length; i++)
                threadPool[i] = new Thread(Program.OnPopulateDB);
            for (int i = 0; i < threadPool.Length; i++)
                threadPool[i].Start(i);
            for (int i = 0; i < threadPool.Length; i++)
                threadPool[i].Join();
        }

        static void OnPopulateDB(object i_arg0)
        {
            int threadID = -1;
            bool hasValidID = false;
            if (int.TryParse(i_arg0.ToString(), out threadID))
            {
                hasValidID = true;
                Console.WriteLine("Running thread#" + threadID);
            }

            TaskAssignmentService.TaskService svc = new TaskAssignmentService.TaskService();
            int addedActivities = 0;
            var activities = svc.GetAllActivities();
            var groups = svc.GetAllGroups();
            Random random = new Random();

            foreach (var activity in activities)
            {
                foreach (var group in groups)
                {
                    int activityID = activity.ID;
                    int groupID = group.ID;

                    int iterCount = random.Next(1, 20);
                    for (int i = 0; i < iterCount; i++)
                    {
                        addedActivities += svc.AddEmployeeCount(groupID, activityID, random.Next(1, 50));
                    }

                    Thread.Sleep(random.Next(500, 900));
                }

                Thread.Sleep(random.Next(500, 900));
            }

            if (hasValidID)
                Console.WriteLine("Thread#" + threadID + " has finished....and added........." + addedActivities);
            lock (ms_lock)
            {
                ms_ActivityCount += addedActivities;
            }
        }

        private static void ReadDB(DateTime startTime)
        {
            TaskAssignmentService.TaskService svc = new TaskAssignmentService.TaskService();
            var tasks = svc.GetTaskAssignments(new DateTime(startTime.Year, startTime.Month, startTime.Day), new DateTime(2050, 12, 31), 1, 10000);

            Console.WriteLine("We have a total of......." + tasks.Count);
        }

        static void Main(string[] args)
        {
            DateTime startTime = DateTime.Now;
            // comment this line below for less output
            TaskAssignmentServiceLogger.Instance.Severity = eLogSeverity.kAll;

            PopulateDB();
            ReadDB(startTime);

            Console.ReadLine();
        }
    }
}
