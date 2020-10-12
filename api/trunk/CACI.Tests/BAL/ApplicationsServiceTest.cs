using AutoMapper;
using CACI.BAL;
using CACI.DAL;
using CACI.DAL.Models;
using CACI.ViewModels;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.Tests
{
	[TestClass]
	public class ApplicationsServiceTest
	{
		private readonly Mock<IApplicationRepository> mockRepository;
		private readonly IMapper mapper;

		public ApplicationsServiceTest()
		{
			mockRepository = new Mock<IApplicationRepository>();

            var config = new MapperConfiguration(opts =>
            {
                opts.CreateMap<Application, ApplicationViewModel>().ReverseMap();
            });

            mapper = config.CreateMapper(); // Use this mapper to instantiate your class

            // More setups here
        }

        [TestMethod]
        public void GetApplications_ReturnsIEnumerableOfApplications()
        {
            Application expected = new Application
            {
                ApplicationId = 1,
                ApplicationName = "TestApplication",
                StatusId = 1,
                SystemOwner = "SystemOwner",
                IMatrixNumber = "IMatrixNumber",
                PhaseId = 1,
                POC = "POC",
                Expiration = DateTime.Parse("2021-01-01")
            };

            var mockList = new List<Application>();
            mockList.Add(
                new Application
                {
                    ApplicationId = 1,
                    ApplicationName = "TestApplication",
                    StatusId = 1,
                    SystemOwner = "SystemOwner",
                    IMatrixNumber = "IMatrixNumber",
                    PhaseId = 1,
                    POC = "POC",
                    Expiration = DateTime.Parse("2021-01-01")
                }
            );

            mockRepository.Setup(m => m.Get()).Returns(mockList);

            var mockService = new ApplicationService(mockRepository.Object, mapper);

            var result = mockService.GetApplications();

            Assert.AreEqual(1, result.Count());
            Assert.AreEqual(expected.ApplicationId,  result.FirstOrDefault().ApplicationId);
            Assert.AreEqual(expected.ApplicationName, result.FirstOrDefault().ApplicationName);
            Assert.AreEqual(expected.StatusId, result.FirstOrDefault().StatusId);
            Assert.AreEqual(expected.SystemOwner, result.FirstOrDefault().SystemOwner);
            Assert.AreEqual(expected.IMatrixNumber, result.FirstOrDefault().IMatrixNumber);
            Assert.AreEqual(expected.PhaseId, result.FirstOrDefault().PhaseId);
            Assert.AreEqual(expected.POC, result.FirstOrDefault().POC);

            mockService.Should().NotBeNull();
        }

        [TestMethod]
        public void GetExpiringApplications_ReturnsExpiringApplicationsViewModelWithExpiredAndExpiringApplications()
        {
            var mockExpiredList = new List<Application>();
            Application expiredApplication = new Application
            {
                ApplicationId = 1,
                ApplicationName = "Expired Application",
                StatusId = 1,
                SystemOwner = "SystemOwner",
                IMatrixNumber = "IMatrixNumber",
                PhaseId = 1,
                POC = "POC",
                Expiration = DateTime.Now.AddDays(-10)
            };
            mockExpiredList.Add(expiredApplication);
            mockRepository.Setup(m => m.GetExpiredApplications()).Returns(mockExpiredList);

            Application expiringApplication = new Application
            {
                ApplicationId = 2,
                ApplicationName = "Expiring Application",
                StatusId = 1,
                SystemOwner = "SystemOwner",
                IMatrixNumber = "IMatrixNumber",
                PhaseId = 1,
                POC = "POC",
                Expiration = DateTime.Now.AddDays(10)
            };
            var mockExpiringList = new List<Application>();
            mockExpiringList.Add(expiringApplication);
            mockRepository.Setup(m => m.GetExpiringApplications(null)).Returns(mockExpiringList);

            var mockService = new ApplicationService(mockRepository.Object, mapper);

            var result = mockService.GetExpiringApplications(null);

            Assert.AreEqual(1, result.ExpiredApplications.Count);
            Assert.IsNotNull(result.ExpiredApplications.FirstOrDefault());
            Assert.AreEqual(expiredApplication.ApplicationId, result.ExpiredApplications.FirstOrDefault().ApplicationId);
            Assert.AreEqual(expiredApplication.ApplicationName, result.ExpiredApplications.FirstOrDefault().ApplicationName);

            Assert.AreEqual(1, result.ExpiringApplications.Count);
            Assert.IsNotNull(result.ExpiringApplications.FirstOrDefault());
            Assert.AreEqual(expiringApplication.ApplicationId, result.ExpiringApplications.FirstOrDefault().ApplicationId);
            Assert.AreEqual(expiringApplication.ApplicationName, result.ExpiringApplications.FirstOrDefault().ApplicationName);

            mockService.Should().NotBeNull();
        }

        [TestMethod]
        public void GetApplications_ReturnsApplication()
        {
            Application expected = new Application
            {
                ApplicationId = 1,
                ApplicationName = "TestApplication",
                StatusId = 1,
                SystemOwner = "SystemOwner",
                IMatrixNumber = "IMatrixNumber",
                PhaseId = 1,
                POC = "POC",
                Expiration = DateTime.Parse("2021-01-01")
            };

            Application mockEntityModel = new Application
            {
                ApplicationId = 1,
                ApplicationName = "TestApplication",
                StatusId = 1,
                SystemOwner = "SystemOwner",
                IMatrixNumber = "IMatrixNumber",
                PhaseId = 1,
                POC = "POC",
                Expiration = DateTime.Parse("2021-01-01")
            };

            mockRepository.Setup(m => m.GetById(expected.ApplicationId)).Returns(mockEntityModel);

            var mockService = new ApplicationService(mockRepository.Object, mapper);

            var result = mockService.GetApplication(expected.ApplicationId);

            Assert.AreEqual(expected.ApplicationId, result.ApplicationId);
            Assert.AreEqual(expected.ApplicationName, result.ApplicationName);
            Assert.AreEqual(expected.StatusId, result.StatusId);
            Assert.AreEqual(expected.SystemOwner, result.SystemOwner);
            Assert.AreEqual(expected.IMatrixNumber, result.IMatrixNumber);
            Assert.AreEqual(expected.PhaseId, result.PhaseId);
            Assert.AreEqual(expected.POC, result.POC);

            mockService.Should().NotBeNull();
        }

        [TestMethod]
        public void AddApplication_SavesTheApplication()
        {
            Application addMe = new Application
            {
                ApplicationName = "TestApplication",
                StatusId = 1,
                SystemOwner = "SystemOwner",
                IMatrixNumber = "IMatrixNumber",
                PhaseId = 1,
                POC = "POC",
                Expiration = DateTime.Parse("2021-01-01")
            };

            mockRepository.Setup(m => m.AddApplication(addMe)).Returns(true);

            var mockService = new ApplicationService(mockRepository.Object, mapper);

            var result = mockService.AddApplication(addMe);

            Assert.AreEqual(true, result);

            mockService.Should().NotBeNull();
        }

        [TestMethod]
        public void UpdateApplication_SavesTheApplication()
        {
            Application updateMe = new Application
            {
                ApplicationId = 1,
                ApplicationName = "TestApplication",
                StatusId = 1,
                SystemOwner = "SystemOwner",
                IMatrixNumber = "IMatrixNumber",
                PhaseId = 1,
                POC = "POC",
                Expiration = DateTime.Parse("2021-01-01")
            };

            mockRepository.Setup(m => m.UpdateApplication(updateMe)).Returns(true); 

            var mockService = new ApplicationService(mockRepository.Object, mapper);

            var result = mockService.UpdateApplication(updateMe);

            Assert.AreEqual(true, result);

            mockService.Should().NotBeNull();
        }

    }
}