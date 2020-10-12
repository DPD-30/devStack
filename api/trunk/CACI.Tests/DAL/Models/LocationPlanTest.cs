using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class LocationPlanTest
    {
        [TestMethod]
        public void LocationPlanTest_Init()
        {
            var createdDate = DateTime.Now;
            LocationPlan obj = new LocationPlan()
            {
                LocationPlanId = 1,
                PlanDetails = "Go here",
                StatusId = 2,
                SectionId = 3,
                LocationId = 4,
                CreatedUser = "SYSTEM",
                CreatedDate = createdDate,
                ModifiedDate = createdDate
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.LocationPlanId);
            Assert.AreEqual("Go here", obj.PlanDetails);
            Assert.AreEqual(2, obj.StatusId);
            Assert.AreEqual(3, obj.SectionId);
            Assert.AreEqual(4, obj.LocationId);
            Assert.AreEqual("SYSTEM", obj.CreatedUser);
            Assert.AreEqual(createdDate, obj.CreatedDate);
            Assert.AreEqual(createdDate, obj.ModifiedDate);
            Assert.IsNull(obj.Location);
           }
    }
}
