using System;
using System.Collections.Generic;
using CACI.DAL.Models;
using AutoMapper;
using CACI.DAL;
using CACI.ViewModels;
using AutoMapper.Internal;

namespace CACI.BAL
{
    public class ApplicationService : IApplicationService
    {
        private readonly IApplicationRepository applicationRepository;
        private readonly IMapper mapper;

        public ApplicationService(IApplicationRepository _applicationRepository, IMapper _mapper)
        {
            applicationRepository = _applicationRepository;
            mapper = _mapper;
        }

        public IEnumerable<Application> GetApplications()
        {
            var _applications = applicationRepository.Get();
            _applications.ForAll(a => {
                if (string.IsNullOrWhiteSpace(a.Icon))
                {
                    if (a.Expiration.GetValueOrDefault() <= DateTime.Now)
                    {
                        a.Icon = "exclamation";
                    }
                    else if (a.Expiration.GetValueOrDefault() < DateTime.Now.AddDays(60))
                    {
                        a.Icon = "hourglass-half";
                    }
                    else
                    {
                        a.Icon = "";
                    }
                }
            });
    
            return _applications;
        }

        public ExpiringApplicationsViewModel GetExpiringApplications(int? withinDays)
        {
            var viewModel = new ExpiringApplicationsViewModel();
            viewModel.ExpiringApplications = new List<ApplicationViewModel>();
            viewModel.ExpiredApplications = new List<ApplicationViewModel>();

            var expiredApplications = applicationRepository.GetExpiredApplications();
            var expiringApplications = applicationRepository.GetExpiringApplications(withinDays);

            foreach (Application a in expiredApplications)
            {
                if (string.IsNullOrWhiteSpace(a.Icon)) a.Icon = "exclamation";
                viewModel.ExpiredApplications.Add(mapper.Map<ApplicationViewModel>(a));
            }

            foreach (Application a in expiringApplications)
            {
                if (string.IsNullOrWhiteSpace(a.Icon)) a.Icon = "hourglass-half";
                viewModel.ExpiringApplications.Add(mapper.Map<ApplicationViewModel>(a));
            }

            return viewModel;
        }

        public Application GetApplication(int Id)
        {
            var _application = applicationRepository.GetById(Id);
            if (string.IsNullOrWhiteSpace(_application.Icon))
            {
                if (_application.Expiration.GetValueOrDefault() <= DateTime.Now)
                {
                    _application.Icon = "exclamation";
                }
                else if (_application.Expiration.GetValueOrDefault() < DateTime.Now.AddDays(60))
                {
                    _application.Icon = "hourglass-half";
                }
                else
                {
                    _application.Icon = "";
                }
            }

            return _application;
        }

        public bool AddApplication(Application _application)
        {
            return applicationRepository.AddApplication(_application);
        }

        public bool UpdateApplication(Application _application)
        {
            return applicationRepository.UpdateApplication(_application);
        }

    }
}
