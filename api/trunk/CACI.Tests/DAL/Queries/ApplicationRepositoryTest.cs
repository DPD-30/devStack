using CACI.DAL;
using CACI.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.Tests.DAL
{
    [TestClass]
    public class ApplicationRepositoryTest
    {
        readonly private CacidbContext context;

        public ApplicationRepositoryTest()
        {

            var options = new DbContextOptionsBuilder<CacidbContext>()
                .UseInMemoryDatabase(databaseName: "CACIDB")
                .Options;

            context = new CacidbContext(options);

            context.Database.EnsureDeleted();
            context.Application.Add(new Application
            {
                ApplicationId = 1,
                ApplicationName = "Test App 1",
                StatusId = 1,
                SystemOwner = "Fred Sanford",
                IMatrixNumber = "2",
                PhaseId = 2,
                POC = "Lamont Sanford",
                IsActive = true,
                IsApproved = true,
                CreatedDate = DateTime.Now,
                CreatedUser = "TestAdmin",
                ModifiedDate = DateTime.Now,
                ModifiedUser = "TestAdmin",
                Expiration = DateTime.Now.AddYears(3),
                Icon = "testing"
            });
            context.Application.Add(new Application
            {
                ApplicationId = 2,
                ApplicationName = "Test App 2",
                StatusId = 1,
                SystemOwner = "Billy Bob",
                IMatrixNumber = "2",
                PhaseId = 2,
                POC = "Joe Bob",
                IsActive = true,
                IsApproved = true,
                CreatedDate = DateTime.Now,
                CreatedUser = "TestAdmin",
                ModifiedDate = DateTime.Now,
                ModifiedUser = "TestAdmin",
                Expiration = DateTime.Now.AddYears(-2),
                Icon = "testing"
            });
            context.Application.Add(new Application
            {
                ApplicationId = 3,
                ApplicationName = "Test App 3",
                StatusId = 1,
                SystemOwner = "Stan Lee",
                IMatrixNumber = "2",
                PhaseId = 2,
                POC = "Loretta Chow",
                IsActive = true,
                IsApproved = true,
                CreatedDate = DateTime.Now,
                CreatedUser = "TestAdmin",
                ModifiedDate = DateTime.Now,
                ModifiedUser = "TestAdmin",
                Expiration = DateTime.Now.AddDays(30),
                Icon = "testing"
            });

            context.SaveChanges();
        }

        [TestMethod]
        public void GetApplication()
        {
            var logger = new Mock<ILogger<ApplicationRepository>>();
            ApplicationRepository repository = new ApplicationRepository(context, logger.Object);

            List<Application> result = repository.Get().ToList();

            Assert.AreEqual(3, result.Count);
        }

        [TestMethod]
        public void GetById()
        {
            var logger = new Mock<ILogger<ApplicationRepository>>();
            ApplicationRepository repository = new ApplicationRepository(context, logger.Object);

            Application result = repository.GetById(1);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void GetExpiredApplications()
        {
            var logger = new Mock<ILogger<ApplicationRepository>>();
            ApplicationRepository repository = new ApplicationRepository(context, logger.Object);

            List<Application> result = repository.GetExpiredApplications().ToList();

            Assert.AreEqual(1, result.Count);
        }

        [TestMethod]
        public void GetExpiringApplications()
        {
            var logger = new Mock<ILogger<ApplicationRepository>>();
            ApplicationRepository repository = new ApplicationRepository(context, logger.Object);

            List<Application> result = repository.GetExpiringApplications(60).ToList();

            Assert.AreEqual(1, result.Count);
        }

        [TestMethod]
        public void GetApplicationByTitle()
        {
            var logger = new Mock<ILogger<ApplicationRepository>>();
            ApplicationRepository repository = new ApplicationRepository(context, logger.Object);

            Application result = repository.GetApplicationsByTitle("Test App 1");

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void AddApplication()
        {
            var logger = new Mock<ILogger<ApplicationRepository>>();
 
            ApplicationRepository repository = new ApplicationRepository(context, logger.Object);
            Application app = new Application()
            {
                ApplicationName = "Application Two"
            };

            bool result = repository.AddApplication(app);

            Assert.AreEqual(true, result);
        }

        [TestMethod]
        public void UpdateApplication()
        {
            var logger = new Mock<ILogger<ApplicationRepository>>();

            ApplicationRepository repository = new ApplicationRepository(context, logger.Object);
            Application app = new Application()
            {
                ApplicationName = "Application Two",
                ApplicationId = 1,
            };

            bool result = repository.UpdateApplication(app);

            Assert.AreEqual(true, result);
        }

        [TestMethod]
        public void DeleteApplication()
        {
            var logger = new Mock<ILogger<ApplicationRepository>>();

            ApplicationRepository repository = new ApplicationRepository(context, logger.Object);
            Application app = repository.GetById(1);

            bool result = repository.DeleteApplication(app);

            Assert.AreEqual(true, result);
        }

        [TestMethod]
        public void DeleteApplicationById()
        {
            var logger = new Mock<ILogger<ApplicationRepository>>();
            ApplicationRepository repository = new ApplicationRepository(context, logger.Object);
 
            var result = repository.DeleteById(1);

            Assert.IsNotNull(result);
            Assert.AreEqual(true, result);
        }

    }
}
