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
    public class ExamTermsController : ControllerBase
    {
        private readonly SchoolContext _context;

        public ExamTermsController(SchoolContext context)
        {
            _context = context;
        }

        // GET: api/ExamTerms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExamTerm>>> GetExamTerm()
        {
            return await _context.ExamTerm.ToListAsync();
        }

        // GET: api/ExamTerms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExamTerm>> GetExamTerm(int id)
        {
            var examTerm = await _context.ExamTerm.FindAsync(id);

            if (examTerm == null)
            {
                return NotFound();
            }

            return examTerm;
        }

        // PUT: api/ExamTerms/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExamTerm(int id, ExamTerm examTerm)
        {
            if (id != examTerm.ExamTermId)
            {
                return BadRequest();
            }

            _context.Entry(examTerm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamTermExists(id))
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

        // POST: api/ExamTerms
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ExamTerm>> PostExamTerm(ExamTerm examTerm)
        {
            _context.ExamTerm.Add(examTerm);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExamTerm", new { id = examTerm.ExamTermId }, examTerm);
        }

        // DELETE: api/ExamTerms/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExamTerm>> DeleteExamTerm(int id)
        {
            var examTerm = await _context.ExamTerm.FindAsync(id);
            if (examTerm == null)
            {
                return NotFound();
            }

            _context.ExamTerm.Remove(examTerm);
            await _context.SaveChangesAsync();

            return examTerm;
        }

        private bool ExamTermExists(int id)
        {
            return _context.ExamTerm.Any(e => e.ExamTermId == id);
        }
    }
}
