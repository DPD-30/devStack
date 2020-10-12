using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class DatabasechangeloglockTest
    {
        [TestMethod]
        public void DatabasechangeloglockTest_Init()
        {
            CACI.DAL.Models.Databasechangeloglock obj = new CACI.DAL.Models.Databasechangeloglock()
            {
                Id = 1,
                Locked = true,
                Lockgranted = DateTime.Now,
                Lockedby = "Ananda"
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.Id);
            Assert.AreEqual(true, obj.Locked);
            Assert.AreEqual("Ananda", obj.Lockedby);
        }
    }
}
