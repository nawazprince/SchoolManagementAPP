using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Models;
using SchoolManagementSystem_SMS_.Data;

namespace SchoolManagementSystem_SMS_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly SchoolContext _context;
        private readonly IWebHostEnvironment _env;

        public EmployeesController(SchoolContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetEmployees()
        {
            var data = await _context.Employees.Select(e => new { employeeId = e.EmployeesId, designationId = e.DesignationId, email = e.Email, fullName = e.FullName, address = e.Address, contactNumber = e.ContactNumber, gender = e.Gender, joiningDate = e.JoiningDate.ToString("dd-MMM-yyyy"), designation = e.Designation.DesignationName, ImagePath = e.ImagePath }).ToListAsync();
            return data;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employees>> GetEmployees(int id)
        {
            var employees = await _context.Employees.FindAsync(id);

            if (employees == null)
            {
                return NotFound();
            }

            return employees;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}"),DisableRequestSizeLimit]
        public async Task<IActionResult> PutEmployees(int id,[FromForm]
        Employees employees)
        {
            if (id != employees.EmployeesId)
            {
                return BadRequest();
            }
            employees = await UploadImage(employees);
            _context.Entry(employees).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        private async Task<Employees> UploadImage(Employees employees)
        {
            if (employees.Image != null && employees.Image.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(employees.Image.FileName);


                string filePath = Path.Combine("Images", fileName);

                string uploadFolder = Path.Combine(_env.WebRootPath, filePath);

                if (!Directory.Exists(Path.GetDirectoryName(uploadFolder)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(uploadFolder));
                }

                await using (FileStream fs = new FileStream(uploadFolder, FileMode.Create))
                {
                    await employees.Image.CopyToAsync(fs);
                }

                employees.ImagePath = filePath.Replace(@"\", "/");
                employees.Image = null;
            }
            return employees;
        }
        // POST: api/Employees
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost,DisableRequestSizeLimit]
        public async Task<ActionResult<Employees>> PostEmployees([FromForm]Employees employees)
        {
            employees = await UploadImage(employees);
            _context.Employees.Add(employees);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployees", new { id = employees.EmployeesId }, employees);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employees>> DeleteEmployees(int id)
        {
            var employees = await _context.Employees.FindAsync(id);
            if (employees == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employees);
            await _context.SaveChangesAsync();

            return employees;
        }

        private bool EmployeesExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeesId == id);
        }
    }
}
