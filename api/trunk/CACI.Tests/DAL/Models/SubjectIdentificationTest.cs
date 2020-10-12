using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class SubjectIdentificationTest
    {
        [TestMethod]
        public void SubjectIdentificationTest_Init()
        {
            SubjectIdentification obj = new SubjectIdentification()
            {
                SubjectIdentificationId = 1,
                SubjectId = 2,
                IdentificationId = 7,
                FirstName = "First",
                Description = "Bad Guy",
                Identification = "Big Ugly"
            };


            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.SubjectIdentificationId);
            Assert.AreEqual(2, obj.SubjectId);
            Assert.AreEqual(7, obj.IdentificationId);
            Assert.AreEqual("First", obj.FirstName);
            Assert.AreEqual("Bad Guy", obj.Description);
            Assert.AreEqual("Big Ugly", obj.Identification);
            Assert.IsNull(obj.Subject);
        }

    }
}
