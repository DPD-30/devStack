using CACI.BAL;
using CACI.DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CACI.Web.Controllers
{
	[Route("[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        //[ValidateAntiForgeryToken]
        //[Authorize(Role ="admin")]
        public ActionResult<IEnumerable<Role>> Get()
        {
            return Ok(_roleService.Get());

        }


        [HttpPost]
        public IActionResult Post(Role _obj)
        {
            if (ModelState.IsValid)
            {
                return Ok(_roleService.Add(_obj));
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [HttpPut]
        public ActionResult Put(Role _obj)
        {

            if (ModelState.IsValid)
            {
                return Ok(_roleService.Update(_obj));
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
                return Ok(_roleService.Remove(id));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Role _obj)
        {
            if (ModelState.IsValid)
            {
                return Ok(_roleService.Remove(_obj));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
