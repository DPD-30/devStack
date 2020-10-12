using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class UserRoleTest
    {
        [TestMethod]
        public void UserRoleTest_Init()
        {
            var createdDate = DateTime.Now;
            CACI.DAL.Models.UserRole obj = new CACI.DAL.Models.UserRole()
            {
                UserRoleId = 15,
                UserId = 12,
                RoleId = 1,
                IsActive = 1,
                CreatedDate = createdDate,
                CreatedUser = "UnitTestAdmin1"
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(15, obj.UserRoleId);
            Assert.AreEqual(12, obj.UserId);
            Assert.AreEqual(1, obj.RoleId);
            Assert.AreEqual(1, obj.IsActive);
            Assert.AreEqual(createdDate, obj.CreatedDate);
            Assert.IsNull(obj.ModifiedDate);
            Assert.IsNull(obj.ModifiedUser);
        }

    }
}
