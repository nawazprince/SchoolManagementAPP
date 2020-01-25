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
    public class StudentAttendancesController : ControllerBase
    {
        private readonly SchoolContext _context;

        public StudentAttendancesController(SchoolContext context)
        {
            _context = context;
        }

        // GET: api/StudentAttendances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentAttendance>>> GetStudentAttendance()
        {
            return await _context.StudentAttendance.ToListAsync();
        }

        // GET: api/StudentAttendances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentAttendance>> GetStudentAttendance(int id)
        {
            var studentAttendance = await _context.StudentAttendance.FindAsync(id);

            if (studentAttendance == null)
            {
                return NotFound();
            }

            return studentAttendance;
        }

        // PUT: api/StudentAttendances/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentAttendance(int id, StudentAttendance studentAttendance)
        {
            if (id != studentAttendance.AttendanceId)
            {
                return BadRequest();
            }

            _context.Entry(studentAttendance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentAttendanceExists(id))
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

        // POST: api/StudentAttendances
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<StudentAttendance>> PostStudentAttendance(StudentAttendance studentAttendance)
        {
            _context.StudentAttendance.Add(studentAttendance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentAttendance", new { id = studentAttendance.AttendanceId }, studentAttendance);
        }

        // DELETE: api/StudentAttendances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentAttendance>> DeleteStudentAttendance(int id)
        {
            var studentAttendance = await _context.StudentAttendance.FindAsync(id);
            if (studentAttendance == null)
            {
                return NotFound();
            }

            _context.StudentAttendance.Remove(studentAttendance);
            await _context.SaveChangesAsync();

            return studentAttendance;
        }

        private bool StudentAttendanceExists(int id)
        {
            return _context.StudentAttendance.Any(e => e.AttendanceId == id);
        }
    }
}
