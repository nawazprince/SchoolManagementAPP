using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem_SMS_.Models;

namespace SchoolManagementSystem_SMS_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private RoleManager<ApplicationRole> _roleManager;
        public RoleController(RoleManager<ApplicationRole> roleManager)
        {

            this._roleManager = roleManager;
        }
        [HttpGet]
        public async Task<ActionResult<List<ApplicationRole>>> Get()
        {
            return  _roleManager.Roles.ToList();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationRole>> GetRole(string id)
        {
            return await _roleManager.FindByIdAsync(id);
        }
        [HttpPost]
        public async Task<ActionResult<ApplicationRole>> CreateRole(ApplicationRole role)
        {
            await _roleManager.CreateAsync(role);
            return CreatedAtAction("Get", new { id = role.Id }, role);



        }



    }
}