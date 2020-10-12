using AutoMapper;
using CACI.BAL.Settings;
using CACI.DAL;
using CACI.DAL.Models;
using CACI.ViewModels;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;

namespace CACI.Tests
{
	[TestClass]
	public class AppSettingServiceTest
	{
		private readonly Mock<ISettingsRepository> mockRepository;
		private readonly Mock<IMapper> mockMapper;

		public AppSettingServiceTest()
		{
			mockRepository = new Mock<ISettingsRepository>();
			mockMapper = new Mock<IMapper>();
		}

		[TestMethod]
		public void GetSettings()
		{
			AppSettings mockSettingRecord = new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" };
			AppSettings mockEntityModel = new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" };
			AppSettings request = new AppSettings { AppSettingId = 0, AppSettingName = "", AppSettingValue = "" };

			var mockSettingList = new List<AppSettings>();
			mockSettingList.Add(new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" });

			mockMapper.Setup(m => m.Map<AppSettings, AppSettings>(It.IsAny<AppSettings>())).Returns(mockEntityModel);
			mockMapper.Setup(m => m.Map<AppSettings, AppSettings>(It.IsAny<AppSettings>())).Returns(mockSettingRecord);
			mockMapper.Setup(m => m.Map<IEnumerable<AppSettings>, IEnumerable<AppSettings>>(It.IsAny<List<AppSettings>>())).Returns(new List<AppSettings> { mockSettingRecord });

			mockRepository.Setup(m => m.GetSettings()).Returns(mockSettingList);

			var mockSettingService = new AppSettingService(mockRepository.Object, mockMapper.Object);

			var result = mockSettingService.GetSettings();
			Assert.IsNotNull(result);
			mockSettingService.Should().NotBeNull();
		}


		[TestMethod]
		public void GetSettingByName()
		{
			AppSettingViewModel mockSettingRecord = new AppSettingViewModel { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" };
			AppSettings mockEntityModel = new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" };
 
			mockMapper.Setup(m => m.Map<AppSettingViewModel, AppSettings>(It.IsAny<AppSettingViewModel>())).Returns(mockEntityModel);
			mockMapper.Setup(m => m.Map<AppSettings, AppSettingViewModel>(It.IsAny<AppSettings>())).Returns(mockSettingRecord);
 
			mockRepository.Setup(m => m.GetSettingByName(It.IsAny<string>())).Returns(mockEntityModel);

			var mockSettingService = new AppSettingService(mockRepository.Object, mockMapper.Object);
			var result = mockSettingService.GetSettingByName("SMTP");

			Assert.AreEqual("SMTP", result.AppSettingName);
			Assert.AreEqual("127.0.0.1", result.AppSettingValue);

			mockSettingService.Should().NotBeNull();
		}

		[TestMethod]
		public void GetSettingById()
		{
			AppSettingViewModel mockSettingRecord = new AppSettingViewModel { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" };
			AppSettings mockEntityModel = new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" };

			mockMapper.Setup(m => m.Map<AppSettingViewModel, AppSettings>(It.IsAny<AppSettingViewModel>())).Returns(mockEntityModel);
			mockMapper.Setup(m => m.Map<AppSettings, AppSettingViewModel>(It.IsAny<AppSettings>())).Returns(mockSettingRecord);

			mockRepository.Setup(m => m.GetSettingByName(It.IsAny<string>())).Returns(mockEntityModel);

			var mockSettingService = new AppSettingService(mockRepository.Object, mockMapper.Object);
			var result = mockSettingService.GetSettingById(1);

			Assert.AreEqual("SMTP", result.AppSettingName);
			Assert.AreEqual("127.0.0.1", result.AppSettingValue);

			mockSettingService.Should().NotBeNull();
		}

		[TestMethod]
		public void AddSetting()
		{
			AppSettingViewModel mockSettingRecord = new AppSettingViewModel { AppSettingId = 2, AppSettingName = "SMTP", AppSettingValue = "127.1.1.1" };
			AppSettings mockEntityModel = new AppSettings { AppSettingId = 2, AppSettingName = "SMTP", AppSettingValue = "127.1.1.1" };
			mockMapper.Setup(m => m.Map<AppSettings, AppSettingViewModel>(It.IsAny<AppSettings>())).Returns(mockSettingRecord);
			mockMapper.Setup(m => m.Map<AppSettingViewModel, AppSettings>(It.IsAny<AppSettingViewModel>())).Returns(mockEntityModel);

			AppSettingViewModel request = mockSettingRecord;

			mockRepository.Setup(m => m.AddSetting(It.IsAny<AppSettings>())).Returns(true);

			var mockSettingService = new AppSettingService(mockRepository.Object, mockMapper.Object);

			var result = mockSettingService.AddSetting(request);

			mockSettingService.Should().NotBeNull();
			Assert.AreEqual(true, result);
		}

		[TestMethod]
		public void UpdateSetting()
		{
			AppSettingViewModel mockSettingRecord = new AppSettingViewModel { AppSettingId = 2, AppSettingName = "SMTP", AppSettingValue = "127.2.1.1" };
			AppSettings mockEntityModel = new AppSettings { AppSettingId = 2, AppSettingName = "SMTP", AppSettingValue = "127.2.1.1" };
			mockMapper.Setup(m => m.Map<AppSettings, AppSettingViewModel>(It.IsAny<AppSettings>())).Returns(mockSettingRecord);
			mockMapper.Setup(m => m.Map<AppSettingViewModel, AppSettings>(It.IsAny<AppSettingViewModel>())).Returns(mockEntityModel);

			AppSettingViewModel request = mockSettingRecord;

			mockRepository.Setup(m => m.UpdateSetting(It.IsAny<AppSettings>())).Returns(true);

			var mockSettingService = new AppSettingService(mockRepository.Object, mockMapper.Object);

			var result = mockSettingService.UpdateSetting(request);

			mockSettingService.Should().NotBeNull();
			Assert.AreEqual(true, result);
		}

		[TestMethod]
		public void RemoveSetting()
		{
			AppSettingViewModel mockSettingRecord = new AppSettingViewModel { AppSettingId = 2, AppSettingName = "SMTP", AppSettingValue = "127.2.1.1" };
			AppSettings mockEntityModel = new AppSettings { AppSettingId = 2, AppSettingName = "SMTP", AppSettingValue = "127.2.1.1" };
			mockMapper.Setup(m => m.Map<AppSettings, AppSettingViewModel>(It.IsAny<AppSettings>())).Returns(mockSettingRecord);
			mockMapper.Setup(m => m.Map<AppSettingViewModel, AppSettings>(It.IsAny<AppSettingViewModel>())).Returns(mockEntityModel);

			AppSettingViewModel request = mockSettingRecord;

			mockRepository.Setup(m => m.RemoveSetting(It.IsAny<AppSettings>())).Returns(true);

			var mockSettingService = new AppSettingService(mockRepository.Object, mockMapper.Object);

			var result = mockSettingService.RemoveSetting(request);

			mockSettingService.Should().NotBeNull();
			Assert.AreEqual(true, result);
		}

		[TestMethod]
		public void RemoveSettingById()
		{
			AppSettingViewModel mockSettingRecord = new AppSettingViewModel { AppSettingId = 2, AppSettingName = "SMTP", AppSettingValue = "127.2.1.1" };

			mockRepository.Setup(m => m.RemoveSetting(It.IsAny<int>())).Returns(true);

			var mockSettingService = new AppSettingService(mockRepository.Object, mockMapper.Object);

			var result = mockSettingService.RemoveSetting(mockSettingRecord.AppSettingId);

			mockSettingService.Should().NotBeNull();
			Assert.AreEqual(true, result);
		}
	}
}
