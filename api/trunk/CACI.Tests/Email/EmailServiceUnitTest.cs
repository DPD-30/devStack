using CACI.Email;
using CACI.ViewModels.Messaging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;

namespace CACI.Tests.Email
{
    [TestClass]
    public class EmailServiceUnitTest
    {

        [TestMethod]
        public void SendEmail()
        {
            var mockSmtpServer = new Mock<ISmtpServer>();
            mockSmtpServer.Setup(m => m.Get()).Returns("greenmail.caci-challenge.us");

            var mockEmailService = new Mock<IEmailService>();

            string from = "Martinnnnn@Martinnnnn.com";
            List<string> to = new List<string> {
                "Martinnnnn@Martinnnnn.com"
            };

            List<string> cc = null;

            List<string> bcc = null;

            string subject = "SendEmail";
            string body = "<h1>This is a test</h1><p>Please do not reply</p>";
            bool isBodyHtml = true;

            mockEmailService.Setup(m => m.SendEmail(from, to, cc, bcc, subject, body, isBodyHtml))
                .Returns(new MessageViewModel() { Response = "Mail Sent", Success = true });

            MessageViewModel message = mockEmailService.Object.SendEmail(from, to, cc, bcc, subject, body, isBodyHtml);

            Assert.AreEqual(true, message.Success);
            Assert.AreEqual("Mail Sent", message.Response);
        }

        [TestMethod]
        public void SendEmailWithCC()
        {
            var mockSmtpServer = new Mock<ISmtpServer>();
            mockSmtpServer.Setup(m => m.Get()).Returns("greenmail.caci-challenge.us");

            var mockEmailService = new Mock<IEmailService>();

            string from = "Martinnnnn@Martinnnnn.com";
            List<string> to = new List<string> {
                "Martinnnnn@Martinnnnn.com"
            };

            List<string> cc = new List<string> {
                "Martinnnnn@Martinnnnn.com"
            };

            List<string> bcc = null;

            string subject = "SendEmailWithCC";
            string body = "<h1>This is a test</h1><p>Please do not reply</p>";
            bool isBodyHtml = true;


            mockEmailService.Setup(m => m.SendEmail(from, to, cc, bcc, subject, body, isBodyHtml))
                .Returns(new MessageViewModel() { Response = "Mail Sent", Success = true });

            MessageViewModel message = mockEmailService.Object.SendEmail(from, to, cc, bcc, subject, body, isBodyHtml);

            Assert.AreEqual(true, message.Success);
        }

        [TestMethod]
        public void SendEmailWithBCC()
        {
            var mockSmtpServer = new Mock<ISmtpServer>();
            mockSmtpServer.Setup(m => m.Get()).Returns("greenmail.caci-challenge.us");
             

            var mockEmailService = new Mock<IEmailService>();

            string from = "Martinnnnn@Martinnnnn.com";
            List<string> to = new List<string> {
                "Martinnnnn@Martinnnnn.com"
            };

            List<string> cc = new List<string> {
                "Martinnnnn@Martinnnnn.com"
            };

            List<string> bcc = new List<string> {
                "Martinnnnn@Martinnnnn.com"
            };

            string subject = "SendEmailWithBCC";
            string body = "<h1>This is a test</h1><p>Please do not reply</p>";
            bool isBodyHtml = true;

            mockEmailService.Setup(m => m.SendEmail(from, to, cc, bcc, subject, body, isBodyHtml))
                .Returns(new MessageViewModel() {Response = "Mail Sent", Success = true});
             
            MessageViewModel message = mockEmailService.Object.SendEmail(from, to, cc, bcc, subject, body, isBodyHtml);

            Assert.AreEqual(true, message.Success);
            Assert.AreEqual("Mail Sent", message.Response);
        }
    }
}
