using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class UserTest
    {
        [TestMethod]
        public void UserTest_Init()
        {
            var createdDate = DateTime.Now;
            CACI.DAL.Models.User obj = new CACI.DAL.Models.User()
            {
                UserId = 15,
                FirstName = "First",
                MiddleName = "M",
                LastName = "Last",
                Email = "first.last@home.com",
                IsActive = true,
                IsApproved = true,
                UserName = "FirstLast",
                Password = "PickSomethingHard",
                CreatedDate = createdDate,
                CreatedUser = "UnitTestAdmin1"

            };


            Assert.IsNotNull(obj);
            Assert.AreEqual(15, obj.UserId);
            Assert.AreEqual("First", obj.FirstName);
            Assert.AreEqual("M", obj.MiddleName);
            Assert.AreEqual("Last", obj.LastName);
            Assert.AreEqual("first.last@home.com", obj.Email);
            Assert.AreEqual(true, obj.IsActive);
            Assert.AreEqual(true, obj.IsApproved);
            Assert.AreEqual("PickSomethingHard", obj.Password);
            Assert.AreEqual(createdDate, obj.CreatedDate);
            Assert.AreEqual("UnitTestAdmin1", obj.CreatedUser);
            Assert.IsNull(obj.ModifiedDate);
            Assert.IsNull(obj.ModifiedUser);
        }

    }
}
