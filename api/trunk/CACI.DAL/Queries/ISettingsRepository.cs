using CACI.DAL.Models;
using System.Collections.Generic;

namespace CACI.DAL
{
	public interface ISettingsRepository
    {
        public IEnumerable<AppSettings> GetSettings();
        public AppSettings GetSettingById(int id);
        public AppSettings GetSettingByName(string name);
        public bool AddSetting(AppSettings setting);
        public bool UpdateSetting(AppSettings setting);
        public bool RemoveSetting(AppSettings setting);
        public bool RemoveSetting(int id);

    }
}
