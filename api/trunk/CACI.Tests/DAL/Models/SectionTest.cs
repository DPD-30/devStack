using Microsoft.VisualStudio.TestTools.UnitTesting;
using CACI.DAL.Models;


namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class SectionTest
    {
        [TestMethod]
        public void SectionTest_Init()
        {
            Section obj = new Section()
            {
                SectionId = 1,
                Title = "Section 1",
                Description  = "The beginning", 
                Instructions = "Perform all required tasks."
             
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual(1, obj.SectionId);
            Assert.AreEqual("Section 1", obj.Title);
            Assert.AreEqual("The beginning", obj.Description);
            Assert.AreEqual("Perform all required tasks.", obj.Instructions);
        }
    }
}
