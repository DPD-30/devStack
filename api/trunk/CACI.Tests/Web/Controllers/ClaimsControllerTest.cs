using CACI.BAL.Security;
using CACI.DAL.Models;
using CACI.Web.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace CACI.Tests.Web.Controllers
{
    [TestClass]
    public class ClaimsControllerTest
    {

        private readonly Mock<IClaimsService> _mockService = new Mock<IClaimsService>();
        private readonly Mock<ILogger<ClaimsController>> _logger = new Mock<ILogger<ClaimsController>>();

        [TestMethod]
        public void ClaimsController_Get()
        {            
            ClaimsController _controller = new ClaimsController(_mockService.Object, _logger.Object);
            var result = _controller.Get();

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ClaimsController_Post()
        {
            Claim application = new Claim()
            {
                ClaimCode = "CRUD_ACCOUNTS", 
                Description = "Manage Accounts",
                Title = "Manage Accounts Claim"
            };
            ClaimsController _controller = new ClaimsController(_mockService.Object, _logger.Object);
            var result = _controller.Post(application);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ClaimsController_Put()
        {
            Claim application = new Claim()
            {
                ClaimCode = "VIEW_ONLY",
                ClaimId = 1,
                Description = "View Only",
                Title = "View Only Claim"
            };
            ClaimsController _controller = new ClaimsController(_mockService.Object, _logger.Object);
            var result = _controller.Put(application);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ClaimsController_DeleteById()
        {
            ClaimsController _controller = new ClaimsController(_mockService.Object, _logger.Object);
            var result = _controller.Delete(1);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ClaimsController_DeleteFromBody()
        {
            Claim application = new Claim()
            {
                ClaimCode = "VIEW_ONLY",
                ClaimId = 1,
                Description = "View Only",
                Title = "View Only Claim"
            };
            ClaimsController _controller = new ClaimsController(_mockService.Object, _logger.Object);
            var result = _controller.Delete(application);

            Assert.IsNotNull(result);
        }


    }
}
