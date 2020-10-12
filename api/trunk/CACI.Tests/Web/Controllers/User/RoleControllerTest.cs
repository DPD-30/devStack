using CACI.BAL;
using CACI.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;

namespace CACI.Tests.Web.Controllers
{
	[TestClass]
    public class RoleControllerTest
    {

        private readonly Mock<IRoleService> _mockService = new Mock<IRoleService>();

        [TestMethod]
        public void RoleService_Get()
        {
            RoleController _controller = new RoleController(_mockService.Object);
            var result = _controller.Get();

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void RoleService_Post()
        {
            CACI.DAL.Models.Role user = new CACI.DAL.Models.Role()
            {
                CreatedDate = DateTime.Now.AddDays(-8), 
                ModifiedDate = DateTime.Now,  
                RoleTitle = "Role Unit Test 9"

            };
            RoleController _controller = new RoleController(_mockService.Object);
            var result = _controller.Post(user);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void RoleService_Put()
        {
            CACI.DAL.Models.Role application = new CACI.DAL.Models.Role()
            {

                CreatedDate = DateTime.Now.AddDays(-8),
                ModifiedDate = DateTime.Now,
                RoleId = 1,
                RoleTitle = "Role Unit Test 5"
            };
            RoleController _controller = new RoleController(_mockService.Object);
            var result = _controller.Put(application);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void RoleService_DeleteById()
        {
            RoleController _controller = new RoleController(_mockService.Object);
            var result = _controller.Delete(1);

            Assert.IsNotNull(result);
        }


        [TestMethod]
        public void RoleService_DeleteFromBody()
        {
            CACI.DAL.Models.Role application = new CACI.DAL.Models.Role()
            {

                CreatedDate = DateTime.Now.AddDays(-8),
                ModifiedDate = DateTime.Now,
                RoleId = 1,
                RoleTitle = "Role Unit Test 3"
            };
            RoleController _controller = new RoleController(_mockService.Object);
            var result = _controller.Delete(application);

            Assert.IsNotNull(result);
        }


    }
}
