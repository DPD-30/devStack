using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class OfficeTest
    {
        [TestMethod]
        public void OfficeTest_Init()
        {
            Office obj = new Office()
            {
                OfficeId = 1,
                Name = "Home Office"
            };


            Assert.IsNotNull(obj);
            Assert.AreEqual("Home Office", obj.Name);
            Assert.AreEqual(0, obj.CaseOffice.Count);
        }

    }
}
