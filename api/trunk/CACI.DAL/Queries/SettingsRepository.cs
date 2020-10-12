using CACI.DAL.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace CACI.DAL
{
    public class SettingsRepository : ISettingsRepository
    {
        private readonly CacidbContext caciDbContent;
        private readonly ILogger<SettingsRepository> logger;

        public SettingsRepository(CacidbContext _caciDbContent, ILogger<SettingsRepository> _logger)
        {
            caciDbContent = _caciDbContent;
            logger = _logger;
        }


        public IEnumerable<AppSettings> GetSettings()
        {
            IEnumerable<AppSettings> settings = null;

            settings = this.caciDbContent.AppSettings.OrderBy(o => o.AppSettingId).ToList();

            return settings;

        }

        public AppSettings GetSettingById(int id)
        {

            return this.caciDbContent.AppSettings.Where(o => o.AppSettingId == id) as AppSettings;

        }

        public AppSettings GetSettingByName(string name)
        {

            return this.caciDbContent.AppSettings.First(f => f.AppSettingName == name);

        }

        public bool AddSetting(AppSettings setting)
        {

            caciDbContent.AppSettings.Add(setting);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool UpdateSetting(AppSettings setting)
        {

            caciDbContent.AppSettings.Update(setting);

            return (caciDbContent.SaveChanges() > 0);
        }

        public bool RemoveSetting(AppSettings setting)
        {

            caciDbContent.AppSettings.Remove(setting);


            return (caciDbContent.SaveChanges() > 0);
        }

        public bool RemoveSetting(int id)
        {

            AppSettings settingToRemove = new AppSettings() { AppSettingId = id };
            caciDbContent.AppSettings.Attach(settingToRemove);
            caciDbContent.AppSettings.Remove(settingToRemove);


            return (caciDbContent.SaveChanges() > 0);
        }
    }
}
