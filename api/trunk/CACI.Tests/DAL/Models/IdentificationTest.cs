using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class IdentificationTest
    {
        [TestMethod]
        public void IdentificationTest_Init()
        {
            Identification obj = new Identification()
            {
                IdentificationId = 1,
                Name = "Badge",
                Description = "Badge",
            };

            Assert.IsNotNull(obj);
            Assert.IsNotNull(obj.SubjectIdentification);
            Assert.AreEqual("Badge", obj.Name);
            Assert.AreEqual("Badge", obj.Description);
        }
    }
}
