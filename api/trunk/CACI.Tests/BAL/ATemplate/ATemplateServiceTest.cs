using AutoMapper;
using CACI.BAL.ATemplate;
using CACI.DAL;
using CACI.ViewModels;
using CACI.ViewModels.ATemplate;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;

namespace CACI.Tests.BAL.ATemplate
{
    [TestClass]
    public class ATemplateServiceTest
    {
        private readonly Mock<IATemplateRepository> mockRepository;
        private readonly Mock<ILogger<ATemplateService>> mockLogger;
        private readonly IMapper mapper;

        public ATemplateServiceTest()
        {
            mockRepository = new Mock<IATemplateRepository>();
            mockLogger = new Mock<ILogger<ATemplateService>>();

            var config = new MapperConfiguration(opts =>
            {
                opts.CreateMap<ATemplateViewModel, CACI.DAL.Models.ATemplate>().ReverseMap();
            });
            
            mapper = config.CreateMapper(); // Use this mapper to instantiate your class
        }

        [TestMethod]
        public void ATemplateService_GetAll()
        {
            var daos = new List<CACI.DAL.Models.ATemplate>();
            daos.Add(new CACI.DAL.Models.ATemplate() { Id = 1 });
            daos.Add(new CACI.DAL.Models.ATemplate() { Id = 2 });
            daos.Add(new CACI.DAL.Models.ATemplate() { Id = 3 });

            mockRepository.Setup(m => m.Get()).Returns(daos);
            var service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            var result = service.GetAll();

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Count());
        }

        [TestMethod]
        public void ATemplateService_GetAll_ThrowsCaciChallengeExceptionOnRepositoryException()
        {
            mockRepository.Setup(m => m.Get()).Throws<DbUpdateException>();
            var service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            Assert.ThrowsException<CaciChallengeException>(() => service.GetAll());
        }

        [TestMethod]
        public void ATemplateService_GetById()
        {
            var dao = new CACI.DAL.Models.ATemplate() { Id = 1 };

            mockRepository.Setup(m => m.GetById(1)).Returns(dao);
            var service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            var result = service.GetById(1);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Id);
        }

        [TestMethod]
        public void ATemplateService_GetById_ThrowsCaciChallengeExceptionOnRepositoryException()
        {
            mockRepository.Setup(m => m.GetById(1)).Throws<DbUpdateException>();
            var service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            Assert.ThrowsException<CaciChallengeException>(() => service.GetById(1));
        }

        [TestMethod]
        public void ATemplateService_Add()
        {
            var dao = new CACI.DAL.Models.ATemplate() { Id = 1 };
            mockRepository.Setup(m => m.Insert(It.IsAny<CACI.DAL.Models.ATemplate>())).Returns(dao);
            ATemplateService service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            ATemplateViewModel obj = new ATemplateViewModel() { Id = 0 };

            var result = service.Add(obj);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Id);
        }

        [TestMethod]
        public void ATemplateService_Add_ThrowsCaciChallengeExceptionOnRepositoryException()
        {
            mockRepository.Setup(m => m.Insert(It.IsAny<CACI.DAL.Models.ATemplate>())).Throws<DbUpdateException>();

            ATemplateService service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            ATemplateViewModel obj = new ATemplateViewModel() { Id = 0 };

            Assert.ThrowsException<CaciChallengeException>(() => service.Add(obj));
        }

        [TestMethod]
        public void ATemplateService_Update()
        {
            var dao = new CACI.DAL.Models.ATemplate() { Id = 1 };
            mockRepository.Setup(m => m.Update(It.IsAny<CACI.DAL.Models.ATemplate>())).Returns(dao);

            ATemplateService service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            ATemplateViewModel obj = new ATemplateViewModel() { Id = 1 };

            var result = service.Update(obj);

            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Id);
        }

        [TestMethod]
        public void ATemplateService_Update_ThrowsCaciChallengeExceptionOnRepositoryException()
        {
            mockRepository.Setup(m => m.Update(It.IsAny<CACI.DAL.Models.ATemplate>())).Throws<DbUpdateException>();

            ATemplateService service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            ATemplateViewModel obj = new ATemplateViewModel() { Id = 1 };

            Assert.ThrowsException<CaciChallengeException>(() => service.Update(obj));
        }

        [TestMethod]
        public void ATemplateService_Delete()
        {
            mockRepository.Setup(m => m.Delete(1)).Returns(true);

            ATemplateService service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            var result = service.Remove(1);

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void ATemplateService_Delete_ThrowsCaciChallengeExceptionOnRepositoryException()
        {
            mockRepository.Setup(m => m.Delete(1)).Throws<DbUpdateException>();

            ATemplateService service = new ATemplateService(mockRepository.Object, mapper, mockLogger.Object);

            Assert.ThrowsException<CaciChallengeException>(() => service.Remove(1));
        }

    }
}
