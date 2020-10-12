using CACI.DAL;
using CACI.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Linq;


namespace CACI.Tests.DAL
{
    [TestClass]
    public class ATemplateRepositoryTest
    {
        private readonly CacidbContext context;

		public ATemplateRepositoryTest()
		{

			var options = new DbContextOptionsBuilder<CacidbContext>()
				.UseInMemoryDatabase(databaseName: "CACIDB")
				.Options;

			context = new CacidbContext(options);

			context.Database.EnsureDeleted();
			context.ATemplate.Add(new ATemplate { Id = 1 });
			context.ATemplate.Add(new ATemplate { Id = 2 });
			context.ATemplate.Add(new ATemplate { Id = 3 });

			context.SaveChanges();
		}

		[TestMethod]
		public void ATemplateRepository_Get()
		{
			var logger = new Mock<ILogger<ATemplateRepository>>();
			ATemplateRepository repository = new ATemplateRepository(context, logger.Object);

			var result = repository.Get();

			Assert.AreEqual(3, result.Count());
		}

		[TestMethod]
		public void ATemplateRepository_GetById()
		{
			var logger = new Mock<ILogger<ATemplateRepository>>();
			ATemplateRepository repository = new ATemplateRepository(context, logger.Object);

			var result = repository.GetById(1);

			Assert.IsNotNull(result);
			Assert.AreEqual(1, result.Id);
		}

		[TestMethod]
		public void ATemplateRepository_Insert()
		{
			var logger = new Mock<ILogger<ATemplateRepository>>();
			ATemplateRepository repository = new ATemplateRepository(context, logger.Object);

			var dao = new CACI.DAL.Models.ATemplate();

			var result = repository.Insert(dao);

			Assert.IsNotNull(result);
			Assert.AreNotEqual(0, result.Id);
		}

		[TestMethod]
		public void ATemplateRepository_Update()
		{
			var logger = new Mock<ILogger<ATemplateRepository>>();
			ATemplateRepository repository = new ATemplateRepository(context, logger.Object);

			var dao = new CACI.DAL.Models.ATemplate()
			{
				Id = 1
			};

			var result = repository.Update(dao);

			Assert.IsNotNull(result);
			Assert.AreEqual(1, result.Id);
		}

		[TestMethod]
		public void ATemplateRepository_Delete()
		{
			var logger = new Mock<ILogger<ATemplateRepository>>();
			ATemplateRepository repository = new ATemplateRepository(context, logger.Object);

			var result = repository.Delete(1);

			Assert.IsNotNull(result);
			Assert.AreEqual(true, result);
		}

	}
}
