using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class ActionTest
    {

        [TestMethod]
        public void ActionTest_Init()
        {
            CACI.DAL.Models.Action obj = new CACI.DAL.Models.Action()
            {
                ActionId = 1,
                ActionName = "Action 1",
                Description = "Action"
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.ActionId);
            Assert.AreEqual("Action 1", obj.ActionName);
            Assert.AreEqual("Action", obj.Description);
            Assert.AreEqual(0, obj.CaseHistory.Count);
        }

    }
}
