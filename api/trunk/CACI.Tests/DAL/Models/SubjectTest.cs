using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class SubjectTest
    {
        [TestMethod]
        public void SubjectTest_Init()
        {
            Subject obj = new Subject()
            {
                SubjectId =1,
                FirstName = "First",
                LastName = "Last",
                MiddleName = "M",
                Dob = "2/14/1987",
                Description = "Bad Guy"
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.SubjectId);
            Assert.AreEqual("First", obj.FirstName);
            Assert.AreEqual("Last", obj.LastName);
            Assert.AreEqual("M", obj.MiddleName);
            Assert.AreEqual("2/14/1987", obj.Dob);
            Assert.AreEqual("Bad Guy", obj.Description);
        }

    }
}
