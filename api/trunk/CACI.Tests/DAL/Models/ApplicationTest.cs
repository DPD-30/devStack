using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CACI.Tests.DAL.Models
{
    [TestClass]
    public class ApplicationTest
    {

        [TestMethod]
        public void ApplicationTest_Init()
        {
            CACI.DAL.Models.Application obj = new CACI.DAL.Models.Application()
            {
                ApplicationId = 1,
                ApplicationName = "Application",
                CreatedDate = DateTime.Now,
                CreatedUser = "AppUser",
                Expiration = DateTime.Now.AddDays(365),
                Icon = "fa-circle",
                IMatrixNumber = "HO889SS",
                IsActive = true,
                IsApproved = false,
                ModifiedDate = DateTime.Now,
                ModifiedUser = "Modified",
                PhaseId = 1,

                POC = "unitester",
                StatusId = 1,
                SystemOwner = "UnitTester"

            };


            Assert.IsNotNull(obj);
        }

    }
}
