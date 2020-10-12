using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class AppSettingsTest
    {

        [TestMethod]
        public void AppSettingsTest_Init()
        {
            CACI.DAL.Models.AppSettings obj = new CACI.DAL.Models.AppSettings()
            {
                AppSettingId = 1,
                AppSettingName = "Email_Server",
                AppSettingValue = "EmailServer1"
            };


            Assert.IsNotNull(obj);
        }
    }
}
