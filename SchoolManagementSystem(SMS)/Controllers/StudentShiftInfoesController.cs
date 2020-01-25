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
    public class StudentShiftInfoesController : ControllerBase
    {
        private readonly SchoolContext _context;

        public StudentShiftInfoesController(SchoolContext context)
        {
            _context = context;
        }

        // GET: api/StudentShiftInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentShiftInfo>>> GetStudentShiftInfo()
        {
            return await _context.StudentShiftInfo.ToListAsync();
        }

        // GET: api/StudentShiftInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentShiftInfo>> GetStudentShiftInfo(int id)
        {
            var studentShiftInfo = await _context.StudentShiftInfo.FindAsync(id);

            if (studentShiftInfo == null)
            {
                return NotFound();
            }

            return studentShiftInfo;
        }

        // PUT: api/StudentShiftInfoes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentShiftInfo(int id, StudentShiftInfo studentShiftInfo)
        {
            if (id != studentShiftInfo.ShiftId)
            {
                return BadRequest();
            }

            _context.Entry(studentShiftInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentShiftInfoExists(id))
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

        // POST: api/StudentShiftInfoes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<StudentShiftInfo>> PostStudentShiftInfo(StudentShiftInfo studentShiftInfo)
        {
            _context.StudentShiftInfo.Add(studentShiftInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentShiftInfo", new { id = studentShiftInfo.ShiftId }, studentShiftInfo);
        }

        // DELETE: api/StudentShiftInfoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentShiftInfo>> DeleteStudentShiftInfo(int id)
        {
            var studentShiftInfo = await _context.StudentShiftInfo.FindAsync(id);
            if (studentShiftInfo == null)
            {
                return NotFound();
            }

            _context.StudentShiftInfo.Remove(studentShiftInfo);
            await _context.SaveChangesAsync();

            return studentShiftInfo;
        }

        private bool StudentShiftInfoExists(int id)
        {
            return _context.StudentShiftInfo.Any(e => e.ShiftId == id);
        }
    }
}
