using CACI.BAL;
using CACI.DAL.Models;
using CACI.Web.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace CACI.Tests.Web.Controllers
{
    [TestClass]
    public class ApplicationControllerTest
    {
        private readonly Mock<IApplicationService> _mockService = new Mock<IApplicationService>();
        private readonly Mock<ILogger<ApplicationController>> _logger = new Mock<ILogger<ApplicationController>>();

        [TestMethod]
        public void ApplicationService_Get()
        {
            ApplicationController _controller = new ApplicationController(_mockService.Object, _logger.Object);
            var result = _controller.Get();

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ApplicationController_GetById()
        {

            ApplicationController _controller = new ApplicationController(_mockService.Object, _logger.Object);
            var result = _controller.Get(1);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ApplicationController_GetExpiringApplications()
        {

            ApplicationController _controller = new ApplicationController(_mockService.Object, _logger.Object);
            var result = _controller.GetExpiringApplications(3650);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ApplicationController_Post()
        {
            Application application = new Application()
            {
                ApplicationName = "Unit test App",
                CreatedDate = System.DateTime.Now,
                CreatedUser = "UnitTestUser",
                Expiration = System.DateTime.Now.AddDays(365),
                IMatrixNumber = "IS773739",
                IsActive = true,
                IsApproved = true,
                PhaseId = 1,
                POC = "Unit Test User Manager",
                StatusId = 1,
                SystemOwner = "Unit Test Product Owner",
                Icon = "Active",

            };
            ApplicationController _controller = new ApplicationController(_mockService.Object, _logger.Object);
            var result = _controller.Post(application);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ApplicationController_Put()
        {
            Application application = new Application()
            { 
                ApplicationId = 1,
                ApplicationName = "Unit test App",
                CreatedDate = System.DateTime.Now,
                CreatedUser = "UnitTestUser",
                Expiration = System.DateTime.Now.AddDays(365),
                IMatrixNumber = "IS773739",
                IsActive = true,
                IsApproved = true,
                PhaseId = 1,
                POC = "Unit Test User Manager",
                StatusId = 1,
                SystemOwner = "Unit Test Product Owner",
                Icon = "Active",

            };
            ApplicationController _controller = new ApplicationController(_mockService.Object, _logger.Object);
            var result = _controller.Put(application);

            Assert.IsNotNull(result);
        }


    }
}
