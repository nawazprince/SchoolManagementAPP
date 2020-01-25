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
    public class DesignationsController : ControllerBase
    {
        private readonly SchoolContext _context;

        public DesignationsController(SchoolContext context)
        {
            _context = context;
        }

        // GET: api/Designations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Designations>>> GetDesignations()
        {
            return await _context.Designations.ToListAsync();
        }

        // GET: api/Designations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Designations>> GetDesignations(int id)
        {
            var designations = await _context.Designations.FindAsync(id);

            if (designations == null)
            {
                return NotFound();
            }

            return designations;
        }

        // PUT: api/Designations/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDesignations(int id, Designations designations)
        {
            if (id != designations.DesignationId)
            {
                return BadRequest();
            }

            _context.Entry(designations).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DesignationsExists(id))
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

        // POST: api/Designations
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Designations>> PostDesignations(Designations designations)
        {
            _context.Designations.Add(designations);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDesignations", new { id = designations.DesignationId }, designations);
        }

        // DELETE: api/Designations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Designations>> DeleteDesignations(int id)
        {
            var designations = await _context.Designations.FindAsync(id);
            if (designations == null)
            {
                return NotFound();
            }

            _context.Designations.Remove(designations);
            await _context.SaveChangesAsync();

            return designations;
        }

        private bool DesignationsExists(int id)
        {
            return _context.Designations.Any(e => e.DesignationId == id);
        }
    }
}
