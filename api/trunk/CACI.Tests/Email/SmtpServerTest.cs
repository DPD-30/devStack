using CACI.Email;
using CACI.BAL.Settings;
using CACI.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using AutoMapper;


namespace CACI.Tests.Email
{

    [TestClass]
    public class SmtpServerTest
    {
        private readonly Mock<IAppSettingService> mockAppSettingService;

        public SmtpServerTest()
        {
            mockAppSettingService = new Mock<IAppSettingService>();
        }

        [TestMethod]
        public void ResultBlankObjectTest()
        {
            var smtpServer = new SmtpServer(mockAppSettingService.Object);

            Assert.IsNotNull(smtpServer);
        }

        [TestMethod]
        public void GetTest()
        {
            mockAppSettingService.Setup(m => m.GetSettingByName("SMTP")).Returns(
                new AppSettingViewModel()
                {
                    AppSettingId = 1,
                    AppSettingName = "SMTP",
                    AppSettingValue = "testserver"
                }
            );

            var smtpServer = new SmtpServer(mockAppSettingService.Object);

            var result = smtpServer.Get();

            Assert.IsNotNull(result);
            Assert.AreEqual("testserver", result);
        }

        [TestMethod]
        public void GetTest_ThrowsAutoMapperConfigurationExceptionWhenSettingNotFound()
        {
            mockAppSettingService.Setup(m => m.GetSettingByName("SMTP")).Returns(null as AppSettingViewModel);

            var smtpServer = new SmtpServer(mockAppSettingService.Object);

            Assert.ThrowsException<AutoMapperConfigurationException>(() => smtpServer.Get());
        }
    }
}
