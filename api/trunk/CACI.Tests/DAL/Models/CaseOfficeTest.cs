using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class CaseOfficeTest
    {

        [TestMethod]
        public void CaseOfficeTest_Init()
        {
            CACI.DAL.Models.CaseOffice obj = new CACI.DAL.Models.CaseOffice()
            {
                CaseId = 1,
                OfficeId = 2,
                CaseOfficeId = 3
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.CaseId);
            Assert.AreEqual(2, obj.OfficeId);
            Assert.AreEqual(3, obj.CaseOfficeId); 
            Assert.IsNull(obj.Case);
        }

    }
}
