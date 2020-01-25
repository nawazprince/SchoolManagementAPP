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
    public class StudentSectionInfoesController : ControllerBase
    {
        private readonly SchoolContext _context;

        public StudentSectionInfoesController(SchoolContext context)
        {
            _context = context;
        }

        // GET: api/StudentSectionInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetStudentSectionInfo()
        {
            return await _context.StudentSectionInfo.Select(sf=>new { sf.SectionId,sf.SectionName,sf.Class.ClassName}).ToListAsync();
        }

        // GET: api/StudentSectionInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentSectionInfo>> GetStudentSectionInfo(int id)
        {
            var studentSectionInfo = await _context.StudentSectionInfo.FindAsync(id);

            if (studentSectionInfo == null)
            {
                return NotFound();
            }

            return studentSectionInfo;
        }

        // PUT: api/StudentSectionInfoes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentSectionInfo(int id, StudentSectionInfo studentSectionInfo)
        {
            if (id != studentSectionInfo.SectionId)
            {
                return BadRequest();
            }

            _context.Entry(studentSectionInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentSectionInfoExists(id))
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

        // POST: api/StudentSectionInfoes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<StudentSectionInfo>> PostStudentSectionInfo(StudentSectionInfo studentSectionInfo)
        {
            _context.StudentSectionInfo.Add(studentSectionInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentSectionInfo", new { id = studentSectionInfo.SectionId }, studentSectionInfo);
        }

        // DELETE: api/StudentSectionInfoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentSectionInfo>> DeleteStudentSectionInfo(int id)
        {
            var studentSectionInfo = await _context.StudentSectionInfo.FindAsync(id);
            if (studentSectionInfo == null)
            {
                return NotFound();
            }

            _context.StudentSectionInfo.Remove(studentSectionInfo);
            await _context.SaveChangesAsync();

            return studentSectionInfo;
        }

        private bool StudentSectionInfoExists(int id)
        {
            return _context.StudentSectionInfo.Any(e => e.SectionId == id);
        }
    }
}
