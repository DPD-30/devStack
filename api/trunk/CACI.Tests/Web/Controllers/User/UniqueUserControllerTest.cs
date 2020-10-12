using CACI.BAL;
using CACI.Web.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace CACI.Tests.Web.Controllers.User
{
	[TestClass]
    public class UniqueUserControllerTest
    {
        private readonly Mock<IUserService> _mockService = new Mock<IUserService>(); 

        [TestMethod]
        public void RoleService_Get()
        {
            UniqueUserController _controller = new UniqueUserController(_mockService.Object);
            var result = _controller.Get("Kung Lao");

            Assert.IsNotNull(result);
        }



    }
}
