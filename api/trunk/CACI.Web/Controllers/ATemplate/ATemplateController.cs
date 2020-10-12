using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using CACI.BAL.ATemplate;
using CACI.ViewModels.ATemplate;

namespace CACI.Web.Controllers.ATemplate
{
    [Route("[controller]")]
    [ApiController]
    public class ATemplateController : ControllerBase
    {
        private readonly IATemplateService service;
        private readonly ILogger<ATemplateController> logger;

        public ATemplateController(IATemplateService _service, ILogger<ATemplateController> _logger)
        {
            service = _service;
            logger = _logger;
        }

        [HttpGet]
        //[ValidateAntiForgeryToken]
        //[Authorize(Roles ="admin")]
        public ActionResult<IEnumerable<ATemplateViewModel>> Get() // Get all
        {
            try
            {
                return Ok(service.GetAll());
            }
            catch (Exception ex)
            {
                logger.LogError($"{this.GetType().FullName} - Failed to get items: {ex}");
                return BadRequest("Failed to get items");
            }
        }

        [HttpGet("{id}")]
        //[ValidateAntiForgeryToken]
        //[Authorize(Roles ="admin")]
        public ActionResult<ATemplateViewModel> Get(int id) // Get one
        {
            try
            {
                var result = service.GetById(id);
                if (result == null) return NotFound();

                return Ok(service.GetById(id));
            }
            catch (Exception ex)
            {
                logger.LogError($"{this.GetType().FullName} - Failed to get item: {ex}");
                return BadRequest("Failed to get item");
            }
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        //[Authorize(Roles ="admin")]
        public ActionResult<ATemplateViewModel> Post([FromBody]ATemplateViewModel saveMe) // Insert
        {
            try
            {
                return Ok(service.Add(saveMe));
            }
            catch (Exception ex)
            {
                logger.LogError($"{this.GetType().FullName} - Failed to save: {ex}");
                return BadRequest("Failed to save");
            }
        }

        [HttpPut("{id}")]
        //[ValidateAntiForgeryToken]
        //[Authorize(Roles ="admin")]
        public ActionResult<ATemplateViewModel> Put(int id, [FromBody] ATemplateViewModel saveMe) // Update
        {
            try
            {
                saveMe.Id = id;
                return Ok(service.Update(saveMe));
            }
            catch (Exception ex)
            {
                logger.LogError($"{this.GetType().FullName} - Failed to save: {ex}");
                return BadRequest("Failed to save");
            }
        }

        [HttpDelete("{id}")]
        //[ValidateAntiForgeryToken]
        //[Authorize(Roles ="admin")]
        public ActionResult<ATemplateViewModel> Delete(int id) // Delete
        {
            try
            {
                return Ok(service.Remove(id));
            }
            catch (Exception ex)
            {
                logger.LogError($"{this.GetType().FullName} - Failed to delete: {ex}");
                return BadRequest("Failed to delete");
            }
        }
    }
}
