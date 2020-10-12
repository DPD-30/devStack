using AutoMapper;
using CACI.DAL;
using CACI.DAL.Models;
using CACI.ViewModels;
using System.Collections.Generic;

namespace CACI.BAL.Settings
{
	public class AppSettingService : IAppSettingService
	{ 
		private readonly ISettingsRepository settingsRepository;
		private readonly IMapper mapper;

		public AppSettingService(ISettingsRepository _settingsRepository, IMapper _mapper)
		{
			settingsRepository = _settingsRepository;
			mapper = _mapper;
		}

		public IEnumerable<AppSettingViewModel> GetSettings()
		{
			var appSettingModel = settingsRepository.GetSettings();
			var appSettingViewModel = mapper.Map<IEnumerable<AppSettings>, IEnumerable<AppSettingViewModel>>(appSettingModel);

			return appSettingViewModel;
		}

		public AppSettingViewModel GetSettingById(int id)
		{
			var appSettingModel = settingsRepository.GetSettingById(id);
			var appSettingViewModel = mapper.Map<AppSettings, AppSettingViewModel>(appSettingModel);

			return appSettingViewModel;
		}
		public AppSettingViewModel GetSettingByName(string name)
		{
			var appSettingModel = settingsRepository.GetSettingByName(name);
			var appSettingViewModel = mapper.Map<AppSettings, AppSettingViewModel>(appSettingModel);

			return appSettingViewModel;
		}

		public bool AddSetting(AppSettingViewModel setting)
		{
			setting.AppSettingId = 0;
			var appSettingModel = mapper.Map<AppSettingViewModel, AppSettings>(setting);
			return settingsRepository.AddSetting(appSettingModel);
		}

		public bool UpdateSetting(AppSettingViewModel setting)
		{
			var appSettingModel = mapper.Map<AppSettingViewModel, AppSettings>(setting);
			return settingsRepository.UpdateSetting(appSettingModel);
		}

		public bool RemoveSetting(AppSettingViewModel setting)
		{
			var appSettingModel = mapper.Map<AppSettingViewModel, AppSettings>(setting);
			return settingsRepository.RemoveSetting(appSettingModel);
		}

		public bool RemoveSetting(int id)
        {
			return settingsRepository.RemoveSetting(id);
		}
	}
}
