using CACI.BAL.Settings;
using CACI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace CACI.Web.Controllers
{
    //[Route("api/[controller]")]
    [Route("[controller]")]
    [ApiController]
    public class AppSettingController : ControllerBase
    {

        private readonly IAppSettingService appSettingService;
        private readonly ILogger<AppSettingController> logger;

        public AppSettingController(IAppSettingService _appSettingService, ILogger<AppSettingController> _logger)
        {
            appSettingService = _appSettingService;
            logger = _logger;
        }

        [HttpGet]
        //[ValidateAntiForgeryToken]
        //[Authorize(Roles ="admin")]
        public ActionResult<IEnumerable<AppSettingViewModel>> Get()
        {
            var settings = appSettingService.GetSettings();
            return Ok(settings);

        }


        [HttpPost]
        public ActionResult<AppSettingViewModel> Post(AppSettingViewModel setting)
        {
            if (ModelState.IsValid)
            {
                return Ok(appSettingService.AddSetting(setting));
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [HttpPut]
        public ActionResult Put(AppSettingViewModel setting)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(appSettingService.UpdateSetting(setting));
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Failed to update setting: {ex}", ex);
            }
            return BadRequest("Failed to put setting");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(appSettingService.RemoveSetting(id));
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Failed to delete setting: {ex}", ex);
            }
            return BadRequest("Failed to delete setting");
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] AppSettingViewModel setting)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(appSettingService.RemoveSetting(setting));
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Failed to delete setting: {ex}", ex);
            }
            return BadRequest("Failed to delete setting");
        }
    }
}
