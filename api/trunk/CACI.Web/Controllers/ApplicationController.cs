using CACI.BAL;
using CACI.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace CACI.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService applicationService;

        public ApplicationController(IApplicationService _applicationService, ILogger<ApplicationController> _logger)
        {
            applicationService = _applicationService;
        }

        [HttpGet]
        //[ValidateAntiForgeryToken]
        //[Authorize(Roles ="admin")]
        public ActionResult<IEnumerable<Application>> Get()
        {
            return Ok(applicationService.GetApplications());

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (ModelState.IsValid)
            {
                return Ok(applicationService.GetApplication(id));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpGet("expiring")]
        public ActionResult<IEnumerable<Application>> GetExpiringApplications(int? withinDays)
        {
            return Ok(applicationService.GetExpiringApplications(withinDays));

        }

        [HttpPost]
        public IActionResult Post(Application _application)
        {
            if (ModelState.IsValid)
            {
                return Ok(applicationService.AddApplication(_application));
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [HttpPut]
        public ActionResult Put(Application _application)
        {
            if (ModelState.IsValid)
            {
                return Ok(applicationService.UpdateApplication(_application));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
