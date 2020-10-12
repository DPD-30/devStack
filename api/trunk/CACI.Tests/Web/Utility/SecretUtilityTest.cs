using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.Web.Utility;

namespace CACI.Tests.Web.Mapping
{
    [TestClass]
    public class SecretUtilityTest
    {
        [TestMethod]
        public void SecretUtilityTest_Init()
        {

            Assert.AreEqual("ignore", CACI.Web.Utility.SecretUtility.Get("Test", "ignore"));
        }
    }
}
