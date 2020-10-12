using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.Tests.DAL.Models
{

    [TestClass]
    public class LocationTest
    {
        [TestMethod]
        public void LocationTest_Init()
        {
            Location obj = new Location()
            {
                LocationId = 1,
                Name = "Room 22",
                Address1 = "Room 22",
                Address2 = "1414 Mockingbird Lane",
                Address3 = "Unit 123",
                City = "Reston",
                State = "VA",
                Country = "USA",
                Critical="Yes",
                Latitude = "-1.0",
                Longitude = "5.555",
                LocationCertification = new List<LocationCertification>(),
                LocationPlan = new List<LocationPlan>()
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.LocationId);
            Assert.AreEqual("Room 22", obj.Name);
            Assert.AreEqual("Room 22", obj.Address1);
            Assert.AreEqual("1414 Mockingbird Lane", obj.Address2);
            Assert.AreEqual("Unit 123", obj.Address3);
            Assert.AreEqual("Reston", obj.City);
            Assert.AreEqual("VA", obj.State);
            Assert.AreEqual("USA", obj.Country);
            Assert.AreEqual("Yes", obj.Critical);
            Assert.AreEqual("-1.0", obj.Latitude);
            Assert.AreEqual("5.555", obj.Longitude);
            Assert.AreEqual(0, obj.LocationCertification.Count);
            Assert.AreEqual(0, obj.LocationPlan.Count);
        }
    }
}
