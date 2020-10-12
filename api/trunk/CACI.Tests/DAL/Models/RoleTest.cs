using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class RoleTest
    {
        [TestMethod]
        public void RoleTest_Init()
        {
            var createdDate = DateTime.Now;
            Role obj = new Role()
            {
               RoleId = 1,
               RoleTitle = "Admin",
               Description = "Administrator",
               CreatedUser = "SYSTEM",
               CreatedDate = createdDate,
               ModifiedDate = createdDate,
               ModifiedUser = "SYSTEM"
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.RoleId);
            Assert.AreEqual("Admin", obj.RoleTitle);
            Assert.AreEqual("Administrator", obj.Description);
            Assert.AreEqual("SYSTEM", obj.CreatedUser);
            Assert.AreEqual(createdDate, obj.CreatedDate);
            Assert.AreEqual("SYSTEM", obj.ModifiedUser);
            Assert.AreEqual(createdDate, obj.ModifiedDate);
        }
    }
}
