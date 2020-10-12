using CACI.BAL;
using CACI.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;

namespace CACI.Tests.Web.Controllers
{
    [TestClass]
    public class UserControllerTest
    {
        private readonly Mock<IUserService> _mockService = new Mock<IUserService>();
        private readonly Mock<ILogger<UserController>> _logger = new Mock<ILogger<UserController>>();

        [TestMethod]
        public void UserController_Get()
        {
            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            var result = _controller.Get();

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void UserController_Post()
        {
            CACI.DAL.Models.User user = new CACI.DAL.Models.User()
            {
                CreatedDate = DateTime.Now.AddDays(-8),
                CreatedUser = "UnitTestUser",
                Email = "Email@unittest.com",
                FirstName = "Unit",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                MiddleName = "T",
                ModifiedDate = DateTime.Now,
                ModifiedUser = "AdminUser",
                Password = "29815pi12jiojkfp3",
                UserId = 1,
                UserName = "UnitTestUser"
            };

            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            var result = _controller.Post(user);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void UserController_Post_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.Add(It.IsAny<CACI.DAL.Models.User>())).Throws(new System.Exception("Test Exception"));
            UserController _controller = new UserController(_mockService.Object, _logger.Object);

            CACI.DAL.Models.User user = new CACI.DAL.Models.User()
            {
                CreatedDate = DateTime.Now.AddDays(-8),
                CreatedUser = "UnitTestUser",
                Email = "Email@unittest.com",
                FirstName = "Unit",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                MiddleName = "T",
                ModifiedDate = DateTime.Now,
                ModifiedUser = "AdminUser",
                Password = "29815pi12jiojkfp3",
                UserId = 1,
                UserName = "UnitTestUser"
            };
            var result = _controller.Post(user);

            Assert.IsTrue(result is BadRequestObjectResult);
        }

        [TestMethod]
        public void UserController_Login()
        {
            CACI.DAL.Models.User user = new CACI.DAL.Models.User()
            {
                CreatedDate = DateTime.Now.AddDays(-8),
                CreatedUser = "UnitTestUser",
                Email = "Email@unittest.com",
                FirstName = "Unit",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                MiddleName = "T",
                ModifiedDate = DateTime.Now,
                ModifiedUser = "AdminUser",
                Password = "29815pi12jiojkfp3",
                UserId = 1,
                UserName = "UnitTestUser"
            };
            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            var result = _controller.Login(user);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void UserController_Login_ReturnsUnauthorizedResultWhenUserServiceLoginReturnsNull()
        {
            _mockService.Setup(m => m.Login(It.IsAny<CACI.DAL.Models.User>())).Returns(null as CACI.DAL.Models.User);
            CACI.DAL.Models.User user = new CACI.DAL.Models.User()
            {
                CreatedDate = DateTime.Now.AddDays(-8),
                CreatedUser = "UnitTestUser",
                Email = "Email@unittest.com",
                FirstName = "Unit",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                MiddleName = "T",
                ModifiedDate = DateTime.Now,
                ModifiedUser = "AdminUser",
                Password = "29815pi12jiojkfp3",
                UserId = 1,
                UserName = "UnitTestUser"
            };
            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            var result = _controller.Login(user);

            Assert.IsTrue(result.Result is UnauthorizedResult);
        }

        [TestMethod]
        public void UserController_Login_ReturnsBadRequestWhenModelStateNotValid()
        {
            CACI.DAL.Models.User user = new CACI.DAL.Models.User()
            {
                CreatedDate = DateTime.Now.AddDays(-8),
                CreatedUser = "UnitTestUser",
                Email = "Email@unittest.com",
                FirstName = "Unit",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                MiddleName = "T",
                ModifiedDate = DateTime.Now,
                ModifiedUser = "AdminUser",
                Password = "29815pi12jiojkfp3",
                UserId = 1,
                UserName = "UnitTestUser"
            };
            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            _controller.ModelState.AddModelError("error", "test");

            var result = _controller.Login(user);

            Assert.IsTrue(result.Result is BadRequestObjectResult);
        }

        [TestMethod]
        public void UserController_Put()
        {
            CACI.DAL.Models.User application = new CACI.DAL.Models.User()
            {
                CreatedDate = DateTime.Now.AddDays(-88),
                CreatedUser = "UnitTestUser8",
                Email = "Email828@unittest.com",
                FirstName = "Unit8",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                MiddleName = "T",
                ModifiedDate = DateTime.Now.AddDays(-32),
                ModifiedUser = "AdminUser",
                Password = "20922pi12jpiajpsfoiojkfp3",
                UserId =9,
                UserName = "UnitTestUser8"
            };
            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            var result = _controller.Put(application);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void UserController_DeleteById()
        {
            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            var result = _controller.Delete(1);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void UserController_DeleteById_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.Delete(It.IsAny<int>())).Throws(new System.Exception("Test Exception"));
            UserController _controller = new UserController(_mockService.Object, _logger.Object);

            var result = _controller.Delete(1);

            Assert.IsTrue(result is BadRequestObjectResult);
        }

        [TestMethod]
        public void UserController_GetById()
        {
            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            var result = _controller.GetById(1);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void UserController_DeleteFromBody()
        {
            CACI.DAL.Models.User user = new CACI.DAL.Models.User()
            {
                CreatedDate = DateTime.Now.AddDays(-88),
                CreatedUser = "UnitTestUser5",
                Email = "Email0938503@unittest.com",
                FirstName = "Unit5",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                MiddleName = "T",
                ModifiedDate = DateTime.Now.AddDays(-32),
                ModifiedUser = "AdminUser",
                Password = "poia-398u3-252",
                UserId = 4,
                UserName = "UnitTestUser5"
            };
            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            var result = _controller.Delete(user);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void UserController_DeleteFromBody_ReturnsBadRequestOnException()
        {
            _mockService.Setup(m => m.Delete(It.IsAny<CACI.DAL.Models.User>())).Throws(new System.Exception("Test Exception"));
            UserController _controller = new UserController(_mockService.Object, _logger.Object);
            CACI.DAL.Models.User user = new CACI.DAL.Models.User()
            {
                CreatedDate = DateTime.Now.AddDays(-88),
                CreatedUser = "UnitTestUser5",
                Email = "Email0938503@unittest.com",
                FirstName = "Unit5",
                LastName = "Test",
                IsActive = true,
                IsApproved = true,
                MiddleName = "T",
                ModifiedDate = DateTime.Now.AddDays(-32),
                ModifiedUser = "AdminUser",
                Password = "poia-398u3-252",
                UserId = 4,
                UserName = "UnitTestUser5"
            };

            var result = _controller.Delete(user);

            Assert.IsTrue(result is BadRequestObjectResult);
        }


    }
}
