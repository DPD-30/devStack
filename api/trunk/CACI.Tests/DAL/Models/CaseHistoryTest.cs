using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using CACI.DAL.Models;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class CaseHistoryTest
    {

        [TestMethod]
        public void CaseHistoryTest_Init()
        {
            var createdDate = DateTime.Now;
            CaseHistory obj = new CaseHistory()
            {
                CaseHistoryId = 0,
                Description = "CaseHistory Description",
                ActionId = 8,
                CaseId = 6,
                CreatedDate = createdDate
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(0, obj.CaseHistoryId);
            Assert.AreEqual("CaseHistory Description", obj.Description);
            Assert.AreEqual(8, obj.ActionId);
            Assert.AreEqual(6, obj.CaseId);
            Assert.AreEqual(createdDate, obj.CreatedDate);
            Assert.IsNull(obj.Action);
            Assert.IsNull(obj.Case);
        }

    }
}
