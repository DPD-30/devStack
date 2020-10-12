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
	public class UserRepositoryTest
    {
		readonly private CacidbContext context;

		public UserRepositoryTest()
		{

			var options = new DbContextOptionsBuilder<CacidbContext>()
				.UseInMemoryDatabase(databaseName: "CACIDB")
				.Options;

			context = new CacidbContext(options);

			context.Database.EnsureDeleted();
			context.User.Add(new User { 
				UserId = 1, 
				UserName = "User0", 
				Email = "user0@home.com", 
				Password = "pass0", 
				FirstName = "first0",
				MiddleName = "L", 
				LastName = "last0",
				IsActive = true,
				IsApproved = true, 
				CreatedDate = DateTime.Now,
				CreatedUser = "UnitTestAdmin1", 
				ModifiedDate = DateTime.Now,
				ModifiedUser = "UnitTestAdmin1"});
			context.User.Add(new User { UserId = 2, UserName = "User1", Email = "user1@home.com", Password = "pass0", FirstName = "first1", LastName = "last1", CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now });
			context.User.Add(new User { UserId = 3, UserName = "User2", Email = "user2@home.com", Password = "pass0", FirstName = "first2", LastName = "last2", CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now });

			context.SaveChanges();
		}

		[TestMethod]
		public void GetUsers()
		{
			var logger = new Mock<ILogger<UserRepository>>();

			// test Get All 
			UserRepository repository = new UserRepository(context, logger.Object);
			List<User> users = repository.Get().ToList();
			Assert.AreEqual(3, users.Count);
		}

		[TestMethod]
		public void GetUserById()
		{
			var logger = new Mock<ILogger<UserRepository>>();

			// test Get All 
			UserRepository repository = new UserRepository(context, logger.Object);
			User CurrentUser = repository.GetById(1);
			Assert.AreEqual(1, CurrentUser.UserId);
			Assert.AreEqual("first0", CurrentUser.FirstName);
			Assert.AreEqual("last0", CurrentUser.LastName);
			Assert.AreEqual("user0@home.com", CurrentUser.Email);
		}

		[TestMethod]
		public void AddUser()
		{
			var logger = new Mock<ILogger<UserRepository>>();

			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.User.Add(new User { UserId = 1, UserName = "User0", Password = "pass0", FirstName = "first0", LastName = "last0", CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				UserRepository repository = new UserRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.Add(new User { UserId = 2, UserName = "User1", Password = "pass1", FirstName = "first1", LastName = "last1", CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now });
				Assert.AreEqual(true, result);

				Assert.AreEqual(2, dbContext.User.ToList()[1].UserId);
				Assert.AreEqual("first1", dbContext.User.ToList()[1].FirstName);
				Assert.AreEqual("last1", dbContext.User.ToList()[1].LastName);
			}

		}


		[TestMethod]
		public void LoginUser()
		{
			var logger = new Mock<ILogger<UserRepository>>();

			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.User.Add(new User { UserId = 1, UserName = "User0", Password = "pass0", FirstName = "first0", LastName = "last0", CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				UserRepository repository = new UserRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				var result = repository.Login("User0","pass0");

				Assert.AreEqual(1, result.UserId);
				Assert.AreEqual("first0", result.FirstName);
				Assert.AreEqual("last0", result.LastName);
			}

		}


		[TestMethod]
		public void UpdateUser()
		{
			var logger = new Mock<ILogger<UserRepository>>();

			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.User.Add(new User { UserId = 1, UserName = "User0", Password = "pass0", FirstName = "first0", LastName = "last0", CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				UserRepository repository = new UserRepository(dbContext, logger.Object);
				// test Get By AppSettingName
				bool result = repository.Update(new User { UserId = 1, UserName = "User0", Password = "pass0", FirstName = "Jack", LastName = "Benny", CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now });
				Assert.AreEqual(true, result);

				Assert.AreEqual(1, dbContext.User.ToList()[0].UserId);
				Assert.AreEqual("Jack", dbContext.User.ToList()[0].FirstName);
				Assert.AreEqual("Benny", dbContext.User.ToList()[0].LastName);
			}

		}

		[TestMethod]
		public void RemoveUser()
		{
			var logger = new Mock<ILogger<UserRepository>>();
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.User.Add(new User { UserId = 1, UserName = "User0", Password = "pass0", FirstName = "first0", LastName = "last0", CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				UserRepository repository = new UserRepository(dbContext, logger.Object);
				var caseOne = repository.GetById(1);
				bool result = repository.Delete(caseOne);
				Assert.AreEqual(true, result);

				List<User> users = repository.Get().ToList();
				Assert.AreEqual(0, users.Count);
			}
		}


		[TestMethod]
		public void RemoveUserById()
		{
			var logger = new Mock<ILogger<UserRepository>>();
			var options = new DbContextOptionsBuilder<CacidbContext>().UseInMemoryDatabase(databaseName: "CACIDB").Options;

			context.Database.EnsureDeleted();

			using (var dbContext = new CacidbContext(options))
			{
				dbContext.User.Add(new User { UserId = 1, UserName = "User0", Password = "pass0", FirstName = "first0", LastName = "last0", CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now });
				dbContext.SaveChanges();
			}

			using (var dbContext = new CacidbContext(options))
			{
				UserRepository repository = new UserRepository(dbContext, logger.Object);
				bool result = repository.Delete(1);
				Assert.AreEqual(true, result);

				List<User> users = repository.Get().ToList();
				Assert.AreEqual(0, users.Count);
			}
		}
	}
}
