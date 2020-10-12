using CACI.BAL.Settings;
using CACI.ViewModels;
using CACI.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace CACI.Tests.Web.Controllers
{
    [TestClass]
    public class AppSettingControllerTest
    {

        private readonly Mock<IAppSettingService> _mockService = new Mock<IAppSettingService>();
        private readonly Mock<ILogger<AppSettingController>> _logger = new Mock<ILogger<AppSettingController>>();

        [TestMethod]
        public void AppSettingController_Get()
        {
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);
            var result = _controller.Get();

            Assert.IsNotNull(result);
        }         

        [TestMethod]
        public void AppSettingController_Post()
        {
            AppSettingViewModel application = new AppSettingViewModel()
            {

                AppSettingName = "SMTP_34",
                AppSettingValue = "mail.unittest.com"

            };
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);
            var result = _controller.Post(application);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void AppSettingController_Put()
        {
            AppSettingViewModel application = new AppSettingViewModel()
            {
                AppSettingId = 1,
                AppSettingName = "SMTP_3",
                AppSettingValue = "mail.unittest.com"
            };
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);
            var result = _controller.Put(application);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void AppSettingController_Put_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.UpdateSetting(It.IsAny<AppSettingViewModel>())).Throws(new System.Exception("Test Exception"));
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);

            var setting = new AppSettingViewModel()
            {
                AppSettingId = 1,
                AppSettingName = "Setting",
                AppSettingValue = "Value"
            };

            var result = _controller.Put(setting);

            Assert.IsTrue(result is BadRequestObjectResult);
        }

        [TestMethod]
        public void AppSettingController_Put_ReturnsBadRequestWhenModelStateNotValid()
        {
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);

            var setting = new AppSettingViewModel()
            {
                AppSettingId = 1,
                AppSettingName = "Setting",
                AppSettingValue = "Value"
            };

            _controller.ModelState.AddModelError("error", "test");

            var result = _controller.Put(setting);

            Assert.IsTrue(result is BadRequestObjectResult);
        }

        [TestMethod]
        public void AppSettingController_DeleteById()
        { 
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);
            var result = _controller.Delete(1);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void AppSettingController_DeleteById_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.RemoveSetting(It.IsAny<int>())).Throws(new System.Exception("Test Exception"));
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);

            var result = _controller.Delete(1);

            Assert.IsTrue(result is BadRequestObjectResult);
        }

        [TestMethod]
        public void AppSettingController_DeleteById_ReturnsBadRequestWhenModelStateNotValid()
        {
            _mockService.Setup(m => m.RemoveSetting(It.IsAny<int>())).Throws(new System.Exception("Test Exception"));
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);

            _controller.ModelState.AddModelError("error", "test");

            var result = _controller.Delete(1);

            Assert.IsTrue(result is BadRequestObjectResult);
        }

        [TestMethod]
        public void AppSettingController_DeleteFromBody()
        {
            AppSettingViewModel setting = new AppSettingViewModel()
            {
                AppSettingId = 1,
                AppSettingName = "SMTP_3",
                AppSettingValue = "mail.unittest.com"
            };
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);
            var result = _controller.Delete(setting);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void AppSettingController_DeleteFromBody_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.RemoveSetting(It.IsAny<AppSettingViewModel>())).Throws(new System.Exception("Test Exception"));
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);

            AppSettingViewModel setting = new AppSettingViewModel()
            {
                AppSettingId = 1,
                AppSettingName = "SMTP_3",
                AppSettingValue = "mail.unittest.com"
            };

            var result = _controller.Delete(setting);

            Assert.IsTrue(result is BadRequestObjectResult);
        }

        [TestMethod]
        public void AppSettingController_DeleteFromBody_ReturnsBadRequestWhenModelStateNotValid()
        {
            _mockService.Setup(m => m.RemoveSetting(It.IsAny<AppSettingViewModel>())).Throws(new System.Exception("Test Exception"));
            AppSettingController _controller = new AppSettingController(_mockService.Object, _logger.Object);

            AppSettingViewModel setting = new AppSettingViewModel()
            {
                AppSettingId = 1,
                AppSettingName = "SMTP_3",
                AppSettingValue = "mail.unittest.com"
            };
            _controller.ModelState.AddModelError("error", "test");

            var result = _controller.Delete(setting);

            Assert.IsTrue(result is BadRequestObjectResult);
        }


    }
}
