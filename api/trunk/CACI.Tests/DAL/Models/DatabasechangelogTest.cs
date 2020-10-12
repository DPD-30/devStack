using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class DatabasechangelogTest
    {
        [TestMethod]
        public void DatabasechangelogTest_Init()
        {
            var dateexecuted = DateTime.Now;
            CACI.DAL.Models.Databasechangelog obj = new CACI.DAL.Models.Databasechangelog()
            {
                Id = "CACI-24",
                Author = "DBA",
                Filename = "Liquibase_20200220",
                Dateexecuted = dateexecuted,
                Orderexecuted = 1,
                Exectype = "Script",
                Md5sum = "sdoilhwrsdkfhskjndfw",
                Description = "Rebase the database",
                Comments = "Don't feed after midnight",
                Tag = "",
                Liquibase = "",
                Contexts = "",
                Labels = "",
                DeploymentId = "42"
            };

            Assert.IsNotNull(obj);
            Assert.AreEqual("CACI-24", obj.Id);
            Assert.AreEqual("DBA", obj.Author);
            Assert.AreEqual("Liquibase_20200220", obj.Filename);
            Assert.AreEqual(dateexecuted, obj.Dateexecuted);
            Assert.AreEqual(1, obj.Orderexecuted);
            Assert.AreEqual("Script", obj.Exectype);
            Assert.AreEqual("sdoilhwrsdkfhskjndfw", obj.Md5sum);
            Assert.AreEqual("Rebase the database", obj.Description);
            Assert.AreEqual("Don't feed after midnight", obj.Comments);
            Assert.AreEqual("", obj.Tag);
            Assert.AreEqual("", obj.Liquibase);
            Assert.AreEqual("", obj.Contexts);
            Assert.AreEqual("", obj.Labels);
            Assert.AreEqual("42", obj.DeploymentId);
        }
    }
}
