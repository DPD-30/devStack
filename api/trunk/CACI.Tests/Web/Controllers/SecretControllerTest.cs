using CACI.Web.Controllers.Secret;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.Web.Controllers
{
    [TestClass]
    public class SecretControllerTest
    {

        [TestMethod]
        public void SecretController_Get()
        {
            SecretController _controller = new SecretController();

            var result = _controller.Get("ignore", "ignore");

            Assert.IsNotNull(result);
        }

    }
}
