using CACI.ViewModels.Notiication;
using CACI.Web.Controllers.Notification;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace CACI.Tests.Web.Controllers
{
    [TestClass]
    public class NotificationTypeControllerTest
    {
        [TestMethod]
        public void NotificationTypeController_Get()
        {
            NotificationTypeController _controller = new NotificationTypeController();
            var result = _controller.Get();

            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, new List<NotificationType>().GetType());
        }

        [TestMethod]
        public void NotificationTypeController_GetOne()
        {
            NotificationTypeController _controller = new NotificationTypeController();
            var result = _controller.Get(1);

            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, new NotificationType().GetType());
        }
    }
}
