using CACI.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.DAL
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly CacidbContext caciDbContent;
        private readonly ILogger<ApplicationRepository> logger;


        public ApplicationRepository(CacidbContext _caciDbContent, ILogger<ApplicationRepository> _logger)
        {
            caciDbContent = _caciDbContent;
            logger = _logger;
        }

        public IEnumerable<Application> Get()
        {
            return this.caciDbContent.Application.OrderBy(o => o.ApplicationId).ToList();

        }

        public Application GetById(int id)
        {
            return this.caciDbContent.Application.FirstOrDefault(o => o.ApplicationId == id);
          
        }

        public Application GetApplicationsByTitle(string name)
        {

            return this.caciDbContent.Application.FirstOrDefault(f => f.ApplicationName == name);
        }

        public IEnumerable<Application> GetExpiredApplications()
        {

            return this.caciDbContent.Application.Where(a => a.Expiration <= DateTime.Now);

        }

        public IEnumerable<Application> GetExpiringApplications(int? withinDays)
        {

            return this.caciDbContent.Application.Where(a =>
                a.Expiration > DateTime.Now
                && a.Expiration < DateTime.Now.AddDays(withinDays.GetValueOrDefault(60)));

        }


        public bool AddApplication(Application _application)
        {

            caciDbContent.Application.Add(_application);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool UpdateApplication(Application saveMe)
        {
            var dao = caciDbContent.Application.First(e => e.ApplicationId == saveMe.ApplicationId);

            dao.ApplicationId = saveMe.ApplicationId;
            dao.ApplicationName = saveMe.ApplicationName;
            dao.Expiration = saveMe.Expiration;
            dao.Icon = saveMe.Icon;
            dao.IMatrixNumber = saveMe.IMatrixNumber;
            dao.IsActive = saveMe.IsActive;
            dao.IsApproved = saveMe.IsApproved;
            dao.ModifiedDate = saveMe.ModifiedDate;
            dao.ModifiedUser = saveMe.ModifiedUser;
            dao.PhaseId = saveMe.PhaseId;
            dao.POC = saveMe.POC;
            dao.StatusId = saveMe.StatusId;
            dao.SystemOwner = saveMe.SystemOwner;

            caciDbContent.Application.Update(dao);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool DeleteApplication(Application _application)
        {
            caciDbContent.Application.Remove(_application);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool DeleteById(int id)
        {
            var deleteMe = caciDbContent.Application.First(e => e.ApplicationId == id);
            caciDbContent.Application.Remove(deleteMe);
            return (caciDbContent.SaveChanges() > 0);
        }
    }
}
