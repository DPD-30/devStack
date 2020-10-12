using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class ATemplateTest
    {

        [TestMethod]
        public void ATemplateTest_Init()
        {
            CACI.DAL.Models.ATemplate obj = new CACI.DAL.Models.ATemplate()
            {
                Id = 1
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.Id);
        }
    }
}
