using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class PhaseTest
    {
        [TestMethod]
        public void BlankObjectTest()
        {
            CACI.DAL.Models.Phase obj = new CACI.DAL.Models.Phase()
            {
                PhaseId = 1,
                Name = "Phase 1"
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.PhaseId);
            Assert.AreEqual("Phase 1", obj.Name);
        }
    }
}
