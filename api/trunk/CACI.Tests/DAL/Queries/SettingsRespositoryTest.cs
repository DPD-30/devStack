using CACI.DAL;
using CACI.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;


namespace CACI.Tests.DAL
{
	[TestClass]
	public class SettingsRespositoryTest
	{
		private CacidbContext context;


		[TestInitialize]
		public void SetUp()
		{
			var options = new DbContextOptionsBuilder<CacidbContext>()
				.UseInMemoryDatabase(databaseName: "CACIDB")
				.Options;

			context = new CacidbContext(options);

			context.Database.EnsureDeleted();
			context.Database.EnsureCreated();

			context.AppSettings.Add(new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" });
			context.AppSettings.Add(new AppSettings { AppSettingId = 2, AppSettingName = "SMTP1", AppSettingValue = "127.1.1.1" });
			context.AppSettings.Add(new AppSettings { AppSettingId = 3, AppSettingName = "SMTP2", AppSettingValue = "127.2.2.2" });
			context.Database.AutoTransactionsEnabled = false;
			context.SaveChanges();

		}

		[TestMethod]
		public void GetSettings()
		{
			var logger = new Mock<ILogger<SettingsRepository>>(); 
			SettingsRepository settingRepository = null;

			// test Get All 
			settingRepository = new SettingsRepository(context, logger.Object);
			List<AppSettings> settings = settingRepository.GetSettings().ToList();
			Assert.AreEqual(3, settings.Count);

		}

		//[TestMethod]
		//public void GetSettingById()
		//{
		//	var logger = new Mock<ILogger<SettingsRepository>>();

		//	SettingsRepository settingRepository = new SettingsRepository(context, logger.Object);
		//	// test Get By AppSettingId
		//	List<AppSettings> settings = settingRepository.GetSettings().ToList();
		//	Assert.AreEqual(1, settings.Count);
		//	Assert.AreEqual(1, settings.FirstOrDefault().AppSettingId);
		//	Assert.AreEqual("SMTP", settings.FirstOrDefault().AppSettingName);
		//	Assert.AreEqual("127.0.0.1", settings.FirstOrDefault().AppSettingValue);

		//	settings = settingRepository.GetSettings().ToList();
		//	Assert.AreEqual(1, settings.Count);
		//	Assert.AreEqual(2, settings.FirstOrDefault().AppSettingId);
		//	Assert.AreEqual("SMTP1", settings.FirstOrDefault().AppSettingName);
		//	Assert.AreEqual("127.1.1.1", settings.FirstOrDefault().AppSettingValue);

		//	settings = settingRepository.GetSettings().ToList();
		//	Assert.AreEqual(1, settings.Count);
		//	Assert.AreEqual(3, settings.FirstOrDefault().AppSettingId);
		//	Assert.AreEqual("SMTP2", settings.FirstOrDefault().AppSettingName);
		//	Assert.AreEqual("127.2.2.2", settings.FirstOrDefault().AppSettingValue);

		//}

		//[TestMethod]
		//public void GetSettingByIdAndName()
		//{
		//	var logger = new Mock<ILogger<SettingsRepository>>();
		//	SettingsRepository settingRepository = new SettingsRepository(context, logger.Object);
		//	// test Get By AppSettingName
		//	List<AppSettings> settings = settingRepository.GetSettings().ToList();
		//	Assert.AreEqual(1, settings.Count);
		//	Assert.AreEqual(1, settings.FirstOrDefault().AppSettingId);
		//	Assert.AreEqual("SMTP", settings.FirstOrDefault().AppSettingName);
		//	Assert.AreEqual("127.0.0.1", settings.FirstOrDefault().AppSettingValue);

		//	settings = settingRepository.GetSettings().ToList();
		//	Assert.AreEqual(1, settings.Count);
		//	Assert.AreEqual(2, settings.FirstOrDefault().AppSettingId);
		//	Assert.AreEqual("SMTP1", settings.FirstOrDefault().AppSettingName);
		//	Assert.AreEqual("127.1.1.1", settings.FirstOrDefault().AppSettingValue);

		//	settings = settingRepository.GetSettings().ToList();
		//	Assert.AreEqual(1, settings.Count);
		//	Assert.AreEqual(3, settings.FirstOrDefault().AppSettingId);
		//	Assert.AreEqual("SMTP2", settings.FirstOrDefault().AppSettingName);
		//	Assert.AreEqual("127.2.2.2", settings.FirstOrDefault().AppSettingValue);

		//}


		//[TestMethod]
		//public void GetSettingByName()
		//{
		//	var logger = new Mock<ILogger<SettingsRepository>>();

		//	SettingsRepository settingRepository = new SettingsRepository(context, logger.Object);
		//	// test Get By AppSettingName
		//	List<AppSettings> settings = settingRepository.GetSettings().ToList();
		//	Assert.AreEqual(1, settings.Count);
		//	Assert.AreEqual(1, settings.FirstOrDefault().AppSettingId);
		//	Assert.AreEqual("SMTP", settings.FirstOrDefault().AppSettingName);
		//	Assert.AreEqual("127.0.0.1", settings.FirstOrDefault().AppSettingValue);

		//	settings = settingRepository.GetSettings().ToList();
		//	Assert.AreEqual(1, settings.Count);
		//	Assert.AreEqual(2, settings.FirstOrDefault().AppSettingId);
		//	Assert.AreEqual("SMTP1", settings.FirstOrDefault().AppSettingName);
		//	Assert.AreEqual("127.1.1.1", settings.FirstOrDefault().AppSettingValue);

		//	settings = settingRepository.GetSettings().ToList();
		//	Assert.AreEqual(1, settings.Count);
		//	Assert.AreEqual(3, settings.FirstOrDefault().AppSettingId);
		//	Assert.AreEqual("SMTP2", settings.FirstOrDefault().AppSettingName);
		//	Assert.AreEqual("127.2.2.2", settings.FirstOrDefault().AppSettingValue);


		//}

		[TestMethod]
		public void AddSetting()
		{
			var logger = new Mock<ILogger<SettingsRepository>>();
			SettingsRepository settingRepository = null;

			settingRepository = new SettingsRepository(context, logger.Object);
			// test Get By AppSettingName
			bool result = settingRepository.AddSetting(new AppSettings { AppSettingId = 0, AppSettingName = "SMTP2", AppSettingValue = "127.6.2.1" });
			Assert.AreEqual(true, result);

		}
		[TestMethod]
		public void UpdateSetting()
		{
			var logger = new Mock<ILogger<SettingsRepository>>();

			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.AppSettings.Add(new AppSettings { AppSettingId = 1, AppSettingName = "", AppSettingValue = "" });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				SettingsRepository repository = new SettingsRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.UpdateSetting(new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" });
				Assert.AreEqual(true, result);

				Assert.AreEqual(1, dbContext.AppSettings.ToList()[0].AppSettingId);
				Assert.AreEqual("SMTP", dbContext.AppSettings.ToList()[0].AppSettingName);
				Assert.AreEqual("127.0.0.1", dbContext.AppSettings.ToList()[0].AppSettingValue);
			}
		}

		[TestMethod]
		public void RemoveSetting()
		{
			var logger = new Mock<ILogger<SettingsRepository>>(); 
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.AppSettings.Add(new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				SettingsRepository repository = new SettingsRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.RemoveSetting(new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" });
				Assert.AreEqual(true, result);

				AppSettings setting = repository.GetSettingById(1);
				Assert.AreEqual(null, setting);
			}
		}


		[TestMethod]
		public void RemoveSettingById()
		{
			var logger = new Mock<ILogger<SettingsRepository>>(); 
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.AppSettings.Add(new AppSettings { AppSettingId = 1, AppSettingName = "SMTP", AppSettingValue = "127.0.0.1" });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				SettingsRepository repository = new SettingsRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.RemoveSetting(1);
				Assert.AreEqual(true, result);

				AppSettings setting = repository.GetSettingById(1);
				Assert.AreEqual(null, setting);
			}
		}
	}
}
