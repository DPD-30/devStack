using AutoMapper;
using CACI.BAL.Settings;
using CACI.ViewModels;

namespace CACI.Email
{
	public class SmtpServer : ISmtpServer
	{
		private readonly IAppSettingService settingsService; 

		public SmtpServer(IAppSettingService _settingsService)
		{
			settingsService = _settingsService;
		}

		public string Get()
		{

			string smtpServer = string.Empty;
			AppSettingViewModel setting = settingsService.GetSettingByName("SMTP");

			if (setting == null)
			{
				throw new AutoMapperConfigurationException("No SMTP setting has been configured");
			}
			else
			{
				smtpServer = setting.AppSettingValue;
			}

			return smtpServer;
		}
	}
}
