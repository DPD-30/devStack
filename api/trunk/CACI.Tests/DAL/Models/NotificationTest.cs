using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class NotificationTest
    {
        [TestMethod]
        public void NotificationTest_Init()
        {
            var createdDate = DateTime.Now;
            Notification obj = new Notification()
            {
                NotificationId = 1,
                NotificationTypeId = 22,
                Message = "Hello, World!",
                CreatedBy = "SYSTEM",
                CreatedDate = createdDate,
                ModifiedDate = createdDate,
                ModifiedBy = "SYSTEM"
            };


            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.NotificationId);
            Assert.AreEqual(22, obj.NotificationTypeId);
            Assert.AreEqual("Hello, World!", obj.Message);
            Assert.AreEqual("SYSTEM", obj.CreatedBy);
            Assert.AreEqual(createdDate, obj.CreatedDate);
            Assert.AreEqual(createdDate, obj.ModifiedDate);
            Assert.AreEqual("SYSTEM", obj.ModifiedBy);
            Assert.IsNull(obj.NotificationType);
        }
    }
}
