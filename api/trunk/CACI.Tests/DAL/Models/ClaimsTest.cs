using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.DAL.Models
{
	[TestClass]
	public class ClaimsTest
    {
        [TestMethod]
        public void ClaimsTest_Init()
        {
            CACI.DAL.Models.Claim obj = new CACI.DAL.Models.Claim()
            {
                ClaimId = 1,
                Title = "Claim",
                Description = "Claim Description",
                ClaimCode = "041",
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.ClaimId);
            Assert.AreEqual("Claim", obj.Title);
        }
    }
}
