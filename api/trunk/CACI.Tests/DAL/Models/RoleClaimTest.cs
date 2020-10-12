using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class RoleClaimTest
    {
        [TestMethod]
        public void RoleClaimTest_Init()
        {
            var createdDate = DateTime.Now;
            RoleClaim obj = new RoleClaim()
            {
                RoleClaimId = 1,
                RoleId = 2,
                ClaimId = 3,
                IsActive = 1,
                CreatedUser = "SYSTEM",
                CreatedDate = createdDate
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.RoleClaimId);
            Assert.AreEqual(2, obj.RoleId);
            Assert.AreEqual(3, obj.ClaimId);
            Assert.AreEqual(1, obj.IsActive);
            Assert.AreEqual("SYSTEM", obj.CreatedUser);
            Assert.AreEqual(createdDate, obj.CreatedDate);
        }
    }
}
