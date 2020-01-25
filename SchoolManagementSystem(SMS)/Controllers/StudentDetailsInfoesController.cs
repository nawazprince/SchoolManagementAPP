using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem_SMS_.Data;
using SchoolManagementSystem_SMS_.Models;

namespace SchoolManagementSystem_SMS_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDetailsInfoesController : ControllerBase
    {
        private readonly SchoolContext _context;

        public StudentDetailsInfoesController(SchoolContext context)
        {
            _context = context;
        }

        // GET: api/StudentDetailsInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetStudentDetailsInfo()
        {
            //return await _context.StudentDetailsInfo.ToListAsync();

            return await _context.StudentDetailsInfo.Select(s => new { s.Admission.StudentName, s.StudentId, s.RollNo, s.StudentDetailsId, s.Class.ClassName, s.Group.GroupName, s.Section.SectionName, s.Shift.ShiftName, admissionDate = s.AdmissionDate.ToString("dd-MMM-yyyy") }).ToListAsync();
        }

        // GET: api/StudentDetailsInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDetailsInfo>> GetStudentDetailsInfo(int id)
        {
            var studentDetailsInfo = await _context.StudentDetailsInfo.FindAsync(id);

            if (studentDetailsInfo == null)
            {
                return NotFound();
            }

            return studentDetailsInfo;
        }

        // PUT: api/StudentDetailsInfoes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentDetailsInfo(int id, StudentDetailsInfo studentDetailsInfo)
        {
            if (id != studentDetailsInfo.StudentDetailsId)
            {
                return BadRequest();
            }

            _context.Entry(studentDetailsInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentDetailsInfoExists(id))
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

        // POST: api/StudentDetailsInfoes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<StudentDetailsInfo>> PostStudentDetailsInfo(StudentDetailsInfo studentDetailsInfo)
        {

            _context.StudentDetailsInfo.Add(studentDetailsInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentDetailsInfo", new { id = studentDetailsInfo.StudentDetailsId }, studentDetailsInfo);
        }

        // DELETE: api/StudentDetailsInfoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentDetailsInfo>> DeleteStudentDetailsInfo(int id)
        {
            var studentDetailsInfo = await _context.StudentDetailsInfo.FindAsync(id);
            if (studentDetailsInfo == null)
            {
                return NotFound();
            }

            _context.StudentDetailsInfo.Remove(studentDetailsInfo);
            await _context.SaveChangesAsync();

            return studentDetailsInfo;
        }

        private bool StudentDetailsInfoExists(int id)
        {
            return _context.StudentDetailsInfo.Any(e => e.StudentDetailsId == id);
        }
    }
}
