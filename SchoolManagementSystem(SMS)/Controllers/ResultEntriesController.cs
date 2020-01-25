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
    public class ResultEntriesController : ControllerBase
    {
        private readonly SchoolContext _context;

        public ResultEntriesController(SchoolContext context)
        {
            _context = context;
        }

        // GET: api/ResultEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResultEntry>>> GetResultEntry()
        {
            return await _context.ResultEntry.ToListAsync();
        }

        // GET: api/ResultEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResultEntry>> GetResultEntry(int id)
        {
            var resultEntry = await _context.ResultEntry.FindAsync(id);

            if (resultEntry == null)
            {
                return NotFound();
            }

            return resultEntry;
        }

        // PUT: api/ResultEntries/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResultEntry(int id, ResultEntry resultEntry)
        {
            if (id != resultEntry.ResultEntryId)
            {
                return BadRequest();
            }

            _context.Entry(resultEntry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultEntryExists(id))
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

        // POST: api/ResultEntries
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ResultEntry>> PostResultEntry(ResultEntry resultEntry)
        {
            _context.ResultEntry.Add(resultEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResultEntry", new { id = resultEntry.ResultEntryId }, resultEntry);
        }

        // DELETE: api/ResultEntries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ResultEntry>> DeleteResultEntry(int id)
        {
            var resultEntry = await _context.ResultEntry.FindAsync(id);
            if (resultEntry == null)
            {
                return NotFound();
            }

            _context.ResultEntry.Remove(resultEntry);
            await _context.SaveChangesAsync();

            return resultEntry;
        }

        private bool ResultEntryExists(int id)
        {
            return _context.ResultEntry.Any(e => e.ResultEntryId == id);
        }
    }
}
