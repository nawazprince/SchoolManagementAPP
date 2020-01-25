using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem_SMS_.Data;
using SchoolManagementSystem_SMS_.Models;
using SchoolManagementSystem_SMS_.ViewModels;

namespace SchoolManagementSystem_SMS_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly SchoolContext _context;

        public ResultsController(SchoolContext context)
        {
            _context = context;
        }

        //GET: api/Results
       [HttpGet]
        public async Task<ActionResult<IEnumerable<Result>>> GetResult()
        {
            return await _context.Result.ToListAsync();
        }


        //[HttpGet]
        //public async Task<ActionResult<ResultSheetViewModel>> GetResult()
        //{
        //    return new ResultSheetViewModel();
        //}

        //[HttpGet()]
        //public async Task<ActionResult<ResultSheetViewModel>> GetResult(ResultSheetViewModel r)
        //{
        //    var sub = _context.Subjects.Find(r.SubjectId);
        //    int examId = _context.Exam.Where(e => e.ClassId == r.ClassId && e.SubjectId == r.SubjectId && e.ExamTermId == r.TermId && e.ExamYearId == r.YearId).FirstOrDefault().ExamId;
        //   var studentList = _context.StudentDetailsInfo.Include(s=>s.Result).Select(s => new ResultEntryListItem(s, sub, examId)).ToList();
        //    r.ResultEntryListItems = studentList;
        //    return r;
        //}

        // GET: api/Results/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Result>> GetResult(int id)
        {
            var result = await _context.Result.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        // PUT: api/Results/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResult(int id, Result result)
        {
            if (id != result.ResultId)
            {
                return BadRequest();
            }

            _context.Entry(result).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultExists(id))
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

        // POST: api/Results
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Result>> PostResult(Result result)
        {
            _context.Result.Add(result);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResult", new { id = result.ResultId }, result);
        }

        // DELETE: api/Results/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Result>> DeleteResult(int id)
        {
            var result = await _context.Result.FindAsync(id);
            if (result == null)
            {
                return NotFound();
            }

            _context.Result.Remove(result);
            await _context.SaveChangesAsync();

            return result;
        }

        private bool ResultExists(int id)
        {
            return _context.Result.Any(e => e.ResultId == id);
        }
    }
}
