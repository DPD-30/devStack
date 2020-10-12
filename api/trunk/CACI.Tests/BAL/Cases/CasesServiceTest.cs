using AutoMapper;
using CACI.BAL.Cases;
using CACI.DAL;
using CACI.DAL.Models;
using CACI.ViewModels;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.Tests
{
	[TestClass]
	public class CasesServiceTest
	{
		private readonly Mock<ICasesRespository> mockRepository;
		private readonly Mock<IMapper> mockMapper;

		public CasesServiceTest()
		{
			mockRepository = new Mock<ICasesRespository>();
			mockMapper = new Mock<IMapper>();
		}

		[TestMethod]
		public void GetCases()
		{
			CaseViewModel mockRecord = new CaseViewModel { CaseId = 1, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };
			Case mockEntityModel = new Case { CaseId = 1, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };

			var mockList = new List<Case>();
			mockList.Add(new Case { CaseId = 1, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" });

			mockMapper.Setup(m => m.Map<CaseViewModel, Case>(It.IsAny<CaseViewModel>())).Returns(mockEntityModel);
			mockMapper.Setup(m => m.Map<Case, CaseViewModel>(It.IsAny<Case>())).Returns(mockRecord);
			mockMapper.Setup(m => m.Map<IEnumerable<Case>, IEnumerable<CaseViewModel>>(It.IsAny<List<Case>>())).Returns(new List<CaseViewModel> { mockRecord });

			mockRepository.Setup(m => m.GetCases()).Returns(mockList);

			var mockService = new CasesService(mockRepository.Object, mockMapper.Object);

			var result = mockService.GetCases();

			Assert.AreEqual(1, result.Count());
			Assert.AreEqual(result.FirstOrDefault().CaseId, mockRecord.CaseId);
			Assert.AreEqual(result.FirstOrDefault().Title, mockRecord.Title);
			Assert.AreEqual(result.FirstOrDefault().Description, mockRecord.Description);

			mockService.Should().NotBeNull();
		}


        [TestMethod]
        public void AddCase()
        {
            CaseViewModel mockRecord = new CaseViewModel { CaseId = 2, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };
            Case mockEntityModel = new Case { CaseId = 2, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };
            mockMapper.Setup(m => m.Map<Case, CaseViewModel>(It.IsAny<Case>())).Returns(mockRecord);
            mockMapper.Setup(m => m.Map<CaseViewModel, Case>(It.IsAny<CaseViewModel>())).Returns(mockEntityModel);

            CaseViewModel request = new CaseViewModel { CaseId = 2, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };

            mockRepository.Setup(m => m.AddCase(It.IsAny<Case>())).Returns(true);

            var mockService = new CasesService(mockRepository.Object, mockMapper.Object);

            var result = mockService.AddCase(request);

            mockService.Should().NotBeNull();
            Assert.AreEqual(true, result);

        }

        [TestMethod]
        public void UpdateCase()
        {
            CaseViewModel mockRecord = new CaseViewModel { CaseId = 3, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };
            Case mockEntityModel = new Case { CaseId = 3, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };
            mockMapper.Setup(m => m.Map<Case, CaseViewModel>(It.IsAny<Case>())).Returns(mockRecord);
            mockMapper.Setup(m => m.Map<CaseViewModel, Case>(It.IsAny<CaseViewModel>())).Returns(mockEntityModel);

            CaseViewModel request = mockRecord;

            mockRepository.Setup(m => m.UpdateCase(It.IsAny<Case>())).Returns(true);

            var mockService = new CasesService(mockRepository.Object, mockMapper.Object);

            var result = mockService.UpdateCase(request);

            mockService.Should().NotBeNull();
            Assert.AreEqual(true, result);

        }

        [TestMethod]
        public void DeleteCase()
        {
            CaseViewModel mockRecord = new CaseViewModel { CaseId = 4, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };
            Case mockEntityModel = new Case { CaseId = 4, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };
            mockMapper.Setup(m => m.Map<Case, CaseViewModel>(It.IsAny<Case>())).Returns(mockRecord);
            mockMapper.Setup(m => m.Map<CaseViewModel, Case>(It.IsAny<CaseViewModel>())).Returns(mockEntityModel);

            CaseViewModel request = mockRecord;

            mockRepository.Setup(m => m.DeleteCase(It.IsAny<Case>())).Returns(true);

            var mockService = new CasesService(mockRepository.Object, mockMapper.Object);

            var result = mockService.RemoveCase(request);

            mockService.Should().NotBeNull();
            Assert.AreEqual(true, result);

        }

        [TestMethod]
        public void DeleteCaseById()
        {
            CaseViewModel mockRecord = new CaseViewModel { CaseId = 5, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" };

            mockRepository.Setup(m => m.DeleteCaseById(It.IsAny<int>())).Returns(true);

            var mockService = new CasesService(mockRepository.Object, mockMapper.Object);

            var result = mockService.RemoveCase(mockRecord.CaseId);

            mockService.Should().NotBeNull();
            Assert.AreEqual(true, result);

        }
    }
}