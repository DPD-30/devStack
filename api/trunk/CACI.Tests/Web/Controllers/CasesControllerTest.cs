using CACI.BAL.Cases;
using CACI.ViewModels;
using CACI.Web.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;

namespace CACI.Tests.Web.Controllers
{
    [TestClass]
    public class CasesControllerTest
    {
        private readonly Mock<ICasesService> _mockService = new Mock<ICasesService>();
        private readonly Mock<ILogger<CasesController>> _logger = new Mock<ILogger<CasesController>>();

        [TestMethod]
        public void CasesController_Get()
        {
            CasesController _controller = new CasesController(_mockService.Object, _logger.Object);
            var result = _controller.Get();

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void CasesController_Post()
        {
            CaseViewModel obj = new CaseViewModel()
            { 
                CreatedDate = DateTime.Now.AddDays(-35),
                Description = "Case Unit Test User",
                Title = "Criminal Complaint 0001",
                StatusID = 1,
                LastModifiedDate = DateTime.Now,
            };
            CasesController _controller = new CasesController(_mockService.Object, _logger.Object);
            var result = _controller.Post(obj);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void CasesController_Put()
        {
            CaseViewModel obj = new CaseViewModel()
            {
                CaseId = 1,
                CreatedDate = DateTime.Now.AddDays(-98),
                Description = "Case Unit Test User2",
                Title = "Criminal Complaint 0003",
                StatusID = 2,
                LastModifiedDate = DateTime.Now,
            };
            CasesController _controller = new CasesController(_mockService.Object, _logger.Object);
            var result = _controller.Put(obj);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void CasesController_DeleteById()
        { 
            CasesController _controller = new CasesController(_mockService.Object, _logger.Object);
            var result = _controller.Delete(13);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void CasesController_Delete()
        {
            CaseViewModel obj = new CaseViewModel()
            {
                CaseId = 50,
                CreatedDate = DateTime.Now.AddDays(-75),
                Description = "Case Unit Test User3",
                Title = "Criminal Complaint 000455",
                StatusID = 1,
                LastModifiedDate = DateTime.Now,
            };
            CasesController _controller = new CasesController(_mockService.Object, _logger.Object);
            var result = _controller.Delete(obj);

            Assert.IsNotNull(result);
        }


    }
}
