using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.DAL
{
    public interface IApplicationRepository
    {
        public IEnumerable<Application> Get();
        public Application GetById(int id);

        IEnumerable<Application> GetExpiredApplications();

        IEnumerable<Application> GetExpiringApplications(int? withinDays);

        public bool AddApplication(Application _application);

        public bool UpdateApplication(Application _application);

        public bool DeleteApplication(Application _application);

        public bool DeleteById(int id);
    }
}
