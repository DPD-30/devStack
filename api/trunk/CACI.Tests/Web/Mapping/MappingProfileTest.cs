using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.Web.Mapping;

namespace CACI.Tests.Web.Mapping
{
    [TestClass]
    public class MappingProfileTest
    {
        [TestMethod]
        public void MappingProfileTest_Init()
        {
            MappingProfile obj = new MappingProfile();
            Assert.IsNotNull(obj);
        }
    }
}
