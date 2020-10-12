using CACI.BAL.ATemplate;
using CACI.ViewModels.ATemplate;
using CACI.Web.Controllers.ATemplate;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace CACI.Tests.Web.Controllers
{
    [TestClass]
    public class ATemplateControllerTest
    {

        private readonly Mock<IATemplateService> _mockService = new Mock<IATemplateService>();
        private readonly Mock<ILogger<ATemplateController>> _logger = new Mock<ILogger<ATemplateController>>();

        [TestMethod]
        public void ATemplateContoller_Get()
        {
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);
            var result = _controller.Get();

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void ATemplateContoller_Get_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.GetAll()).Throws(new System.Exception("Test Exception"));
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);

            var result = _controller.Get();

            Assert.IsTrue(result.Result is BadRequestObjectResult);
        }


        [TestMethod]
        public void ATemplateContoller_GetOne()
        {
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);
            var result = _controller.Get(1);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void ATemplateContoller_GetOne_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.GetById(It.IsAny<int>())).Throws(new System.Exception("Test Exception"));
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);

            var result = _controller.Get(1);

            Assert.IsTrue(result.Result is BadRequestObjectResult);
        }


        [TestMethod]
        public void ATemplateContoller_Post()
        {
            ATemplateViewModel application = new ATemplateViewModel()
            {
                Id = 1
            };
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);
            var result = _controller.Post(application);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void ATemplateContoller_Post_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.Add(It.IsAny<ATemplateViewModel>())).Throws(new System.Exception("Test Exception"));
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);

            ATemplateViewModel application = new ATemplateViewModel()
            {
                Id = 1
            };

            var result = _controller.Post(application);

            Assert.IsTrue(result.Result is BadRequestObjectResult);
        }


        [TestMethod]
        public void ATemplateContoller_Put()
        {
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);

            ATemplateViewModel application = new ATemplateViewModel()
            {
                Id = 99
            };

            var result = _controller.Put(99, application);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void ATemplateContoller_Put_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.Update(It.IsAny<ATemplateViewModel>())).Throws(new System.Exception("Test Exception"));
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);

            ATemplateViewModel application = new ATemplateViewModel()
            {
                Id = 1
            };

            var result = _controller.Put(1, application);

            Assert.IsTrue(result.Result is BadRequestObjectResult);
        }


        [TestMethod]
        public void ATemplateContoller_Delete()
        {
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);

            var result = _controller.Delete(1);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void ATemplateContoller_Delete_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.Remove(It.IsAny<int>())).Throws(new System.Exception("Test Exception"));
            ATemplateController _controller = new ATemplateController(_mockService.Object, _logger.Object);

            var result = _controller.Delete(1);

            Assert.IsTrue(result.Result is BadRequestObjectResult);
        }

    }
}
