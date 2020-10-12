using CACI.DAL;
using CACI.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CACI.Tests.DAL
{
	[TestClass]
	public class CasesRepositoryTest
    {
		readonly private CacidbContext context;

		public CasesRepositoryTest()
		{

			var options = new DbContextOptionsBuilder<CacidbContext>()
				.UseInMemoryDatabase(databaseName: "CACIDB")
				.Options;

			context = new CacidbContext(options);

			context.Database.EnsureDeleted();
			context.Case.Add(new Case { 
				CaseId = 1, 
				StatusId = 1,
				LastModifiedDate= DateTime.Now, 
				CreatedDate = DateTime.Now, 
				Title = "title 0", 
				Description = "test 0"});
			context.Case.Add(new Case { CaseId = 2, Title = "title 1", Description = "test 1", StatusId= 2, CreatedDate = DateTime.Now, LastModifiedDate = DateTime.Now });
			context.Case.Add(new Case { CaseId = 3, Title = "title 2", Description = "test 2", StatusId= 3, CreatedDate = DateTime.Now, LastModifiedDate = DateTime.Now });

			context.SaveChanges();
		}

		[TestMethod]
		public void GetCases()
		{
			var logger = new Mock<ILogger<CasesRepository>>();

			// test Get All 
			CasesRepository repository = new CasesRepository(context, logger.Object);
			List<Case> cases = repository.GetCases().ToList();
			Assert.AreEqual(3, cases.Count);
		}
		
		[TestMethod]
		public void UpdateSetting()
		{
			var logger = new Mock<ILogger<CasesRepository>>();

			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.Case.Add(new Case { CaseId = 1, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				CasesRepository repository = new CasesRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.UpdateCase(new Case { CaseId = 1, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 22", Description = "test 22" });
				Assert.AreEqual(true, result);

				Assert.AreEqual(1, dbContext.Case.ToList()[0].CaseId);
				Assert.AreEqual("title 22", dbContext.Case.ToList()[0].Title);
				Assert.AreEqual("test 22", dbContext.Case.ToList()[0].Description);
			}

		}

		[TestMethod]
		public void RemoveSetting()
		{
			var logger = new Mock<ILogger<CasesRepository>>();
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.Case.Add(new Case { CaseId = 1, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0" });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				CasesRepository repository = new CasesRepository(dbContext, logger.Object);
				var caseOne = repository.GetCases().ToList().Where(m => m.CaseId == 1).FirstOrDefault();
				bool result = repository.DeleteCase(caseOne);
				Assert.AreEqual(true, result);

				List<Case> cases = repository.GetCases().ToList();
				Assert.AreEqual(0, cases.Count);
			}
		}


		[TestMethod]
		public void RemoveSettingById()
		{
			var logger = new Mock<ILogger<CasesRepository>>();
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.Case.Add(new Case {CaseId = 1, LastModifiedDate = DateTime.Now, CreatedDate = DateTime.Now, Title = "title 0", Description = "test 0"});
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				CasesRepository repository = new CasesRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.DeleteCaseById(1);
				Assert.AreEqual(true, result);

				List<Case> cases = repository.GetCases().ToList();
				Assert.AreEqual(0, cases.Count);
			}
		}
	}
}
