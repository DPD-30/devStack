using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class NotificationTypeTest
    {
        [TestMethod]
        public void NotificationTypeTest_Init()
        {
            NotificationType obj = new NotificationType()
            {
                NotificationTypeId = 1,
                Name = "Admin",
                Description = "Administrator"
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.NotificationTypeId);
            Assert.AreEqual("Admin", obj.Name);
            Assert.AreEqual("Administrator", obj.Description);
        }
    }
}
