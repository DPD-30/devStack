using CACI.BAL.Cases;
using CACI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace CACI.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CasesController : ControllerBase
    {
        private readonly ICasesService casesService;

        public CasesController(ICasesService _casesService, ILogger<CasesController> _logger)
        {
            casesService = _casesService;
        }

        [HttpGet]
        //[ValidateAntiForgeryToken]
        //[Authorize(Roles ="admin")]
        public ActionResult<IEnumerable<CaseViewModel>> Get()
        {
            return Ok(casesService.GetCases());

        }


        [HttpPost]
        public IActionResult Post(CaseViewModel _case)
        {

            if (ModelState.IsValid)
            {
                return Ok(casesService.AddCase(_case));
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [HttpPut]
        public ActionResult Put(CaseViewModel _case)
        {
            if (ModelState.IsValid)
            {
                return Ok(casesService.UpdateCase(_case));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            if (ModelState.IsValid)
            {
                return Ok(casesService.RemoveCase(id));
            }
            else
            {
                return BadRequest(ModelState);
            }


        }

        [HttpDelete]
        public IActionResult Delete([FromBody] CaseViewModel _case)
        {
            if (ModelState.IsValid)
            {
                return Ok(casesService.RemoveCase(_case));
            }
            else
            {
                return BadRequest(ModelState);
            }

        }
    }
}
