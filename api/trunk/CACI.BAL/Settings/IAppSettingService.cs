using CACI.ViewModels;
using System.Collections.Generic;

namespace CACI.BAL.Settings
{
	public interface IAppSettingService
    {
		public IEnumerable<AppSettingViewModel> GetSettings();

		public AppSettingViewModel GetSettingById(int id);
		public AppSettingViewModel GetSettingByName(string name);

		public bool AddSetting(AppSettingViewModel setting);

		public bool UpdateSetting(AppSettingViewModel setting);

		public bool RemoveSetting(AppSettingViewModel setting);
		public bool RemoveSetting(int id);

	}
}
