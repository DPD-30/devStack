using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class CaseSubjectTest
    {

        [TestMethod]
        public void CaseSubjectTest_Init()
        {
            CACI.DAL.Models.CaseSubject obj = new CACI.DAL.Models.CaseSubject()
            {
                CaseId = 1,
                CaseSubjectId = 2,
                SubjectId = 3
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.CaseId);
            Assert.AreEqual(2, obj.CaseSubjectId);
            Assert.AreEqual(3, obj.SubjectId); 
            Assert.IsNull(obj.Subject);
        }

    }
}
