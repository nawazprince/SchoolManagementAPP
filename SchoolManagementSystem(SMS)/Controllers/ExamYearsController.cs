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
    public class ExamYearsController : ControllerBase
    {
        private readonly SchoolContext _context;

        public ExamYearsController(SchoolContext context)
        {
            _context = context;
        }

        // GET: api/ExamYears
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamYear>>> GetExamYear()
        {
            return await _context.ExamYear.ToListAsync();
        }

        // GET: api/ExamYears/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExamYear>> GetExamYear(int id)
        {
            var examYear = await _context.ExamYear.FindAsync(id);

            if (examYear == null)
            {
                return NotFound();
            }

            return examYear;
        }

        // PUT: api/ExamYears/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExamYear(int id, ExamYear examYear)
        {
            if (id != examYear.ExamYearId)
            {
                return BadRequest();
            }

            _context.Entry(examYear).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamYearExists(id))
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

        // POST: api/ExamYears
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ExamYear>> PostExamYear(ExamYear examYear)
        {
            _context.ExamYear.Add(examYear);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExamYear", new { id = examYear.ExamYearId }, examYear);
        }

        // DELETE: api/ExamYears/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExamYear>> DeleteExamYear(int id)
        {
            var examYear = await _context.ExamYear.FindAsync(id);
            if (examYear == null)
            {
                return NotFound();
            }

            _context.ExamYear.Remove(examYear);
            await _context.SaveChangesAsync();

            return examYear;
        }

        private bool ExamYearExists(int id)
        {
            return _context.ExamYear.Any(e => e.ExamYearId == id);
        }
    }
}
