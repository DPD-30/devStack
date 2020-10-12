using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class CaseTest
    {

        [TestMethod]
        public void CaseTest_Init()
        {
            var createdDate = DateTime.Now;
            CACI.DAL.Models.Case obj = new CACI.DAL.Models.Case()
            {
                CaseId = 1,
                Description = "Case Description",
                Title = "Case Title",
                StatusId = 1,
                CreatedDate = createdDate
            };


            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.CaseId);
            Assert.AreEqual("Case Description", obj.Description);
            Assert.AreEqual(1, obj.StatusId);
            Assert.AreEqual("Case Title", obj.Title);
            Assert.AreEqual(createdDate, obj.CreatedDate);
            Assert.IsNull(obj.LastModifiedDate);
            Assert.AreEqual(0, obj.CaseHistory.Count);
            Assert.AreEqual(0, obj.CaseOffice.Count);
        }

    }
}
