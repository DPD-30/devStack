using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;
using System;


namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class LocationCertificationTest
    {
        [TestMethod]
        public void LocationCertificationTest_Init()
        {
            LocationCertification obj = new LocationCertification()
            {
                LocationCertificationId = 1,
                LocationId = 2,
                StatusId = 3,
                Comments = "Certified",
                Location = new Location(),
                CreatedUser = "SYSTEM",
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                ModifiedUser = "SYSTEM"
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.LocationCertificationId);
            Assert.AreEqual(2, obj.LocationId);
            Assert.AreEqual(3, obj.StatusId);
            Assert.AreEqual("Certified", obj.Comments);
             
            Assert.IsNotNull(obj.CreatedUser);
            Assert.IsNotNull(obj.CreatedDate);
            Assert.IsNotNull(obj.ModifiedDate);
            Assert.IsNotNull(obj.ModifiedUser);
        }

    

    }
}
