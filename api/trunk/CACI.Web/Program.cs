using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace CACI.Web
{
	public static class Program
	{
		public static void Main(string[] args)
		{ 
			CreateWebHostBuilder(args).Run();
		}

		public static IWebHost CreateWebHostBuilder(string[] args) => 
				WebHost.CreateDefaultBuilder(args)
				.ConfigureAppConfiguration(SetupConfiguration)
				.UseStartup<Startup>()
				.Build();

		private static void SetupConfiguration(WebHostBuilderContext ctx, IConfigurationBuilder builder)
		{
			// remove default configuration options
			builder.Sources.Clear();
			// build up our configuration we want to use
			builder.AddJsonFile("appsettings.json", false, true) // least trustworthly
				.AddEnvironmentVariables();  // most trustworthy

			builder.AddUserSecrets<Startup>();
		}
		 
	}
}
