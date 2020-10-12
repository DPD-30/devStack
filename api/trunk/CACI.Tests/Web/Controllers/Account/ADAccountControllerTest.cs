using Microsoft.AspNetCore.Mvc;
using CACI.Web.Controllers.Account;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace CACI.Tests.Web.Controllers.Account
{
    [TestClass]
    public class ADAccountControllerTest
    {
        [TestMethod]
        public void ADAccountController_Get()
        {
            var user = new ClaimsPrincipal(
                new ClaimsIdentity(
                    new Claim[] {
                        new Claim(ClaimTypes.NameIdentifier, "UserId"),
                        new Claim(ClaimTypes.Name, "User"),
                        new Claim(ClaimTypes.Email, "user@test.com")
                    }, 
                "TestAuthentication")
            );

            ADAccountController _controller = new ADAccountController();
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = new DefaultHttpContext { User = user };

            var result = _controller.Get();

            Assert.IsNotNull(result);
            Assert.IsNotNull("user@test.com", result.Email);
        }

    }
}
