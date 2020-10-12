using System.Collections.Generic;
using CACI.DAL.Models;
using CACI.ViewModels;

namespace CACI.BAL
{
    public interface IApplicationService
    {
        IEnumerable<Application> GetApplications();
        Application GetApplication(int Id);

        ExpiringApplicationsViewModel GetExpiringApplications(int? withinDays);

        bool UpdateApplication(Application _application);

        public bool AddApplication(Application _application);
    }
}
