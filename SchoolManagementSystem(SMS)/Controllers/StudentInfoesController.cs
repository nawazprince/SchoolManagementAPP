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
using SchoolManagementSystem_SMS_.Models;

namespace SchoolManagementSystem_SMS_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentInfoesController : ControllerBase
    {
        private readonly SchoolContext _context;
        private readonly IWebHostEnvironment _env;

        public StudentInfoesController(SchoolContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/StudentInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetStudentInfo()
        {
            return await _context.StudentInfo.Select(st=>new { st.StudentId,st.StudentName,st.FatherName,st.MotherName, dob = st.DateOfBirth.ToString("dd-MMM-yyyy"), st.BloodGroup,st.BirthCertificateNumber,st.Gender,st.GurdianName,st.Nationality,st.Relegion,st.PresentAddress,st.PermanentAddress,st.ImagePath,st.Cell}).ToListAsync();
        }

        // GET: api/StudentInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentInfo>> GetStudentInfo(int id)
        {
            var studentInfo = await _context.StudentInfo.FindAsync(id);

            if (studentInfo == null)
            {
                return NotFound();
            }

            return studentInfo;
        }

        // PUT: api/StudentInfoes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> PutStudentInfo(int id,[FromForm] StudentInfo studentInfo)
        {
            if (id != studentInfo.StudentId)
            {
                return BadRequest();
            }
            studentInfo = await UploadImage(studentInfo);
            _context.Entry(studentInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentInfoExists(id))
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
        private async Task<StudentInfo> UploadImage(StudentInfo studentInfo)
        {
            if (studentInfo.Image != null && studentInfo.Image.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(studentInfo.Image.FileName);


                string filePath = Path.Combine("Images", fileName);

                string uploadFolder = Path.Combine(_env.WebRootPath, filePath);

                if (!Directory.Exists(Path.GetDirectoryName(uploadFolder)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(uploadFolder));
                }

                await using (FileStream fs = new FileStream(uploadFolder, FileMode.Create))
                {
                    await studentInfo.Image.CopyToAsync(fs);
                }

                studentInfo.ImagePath = filePath.Replace(@"\", "/");
                studentInfo.Image = null;
            }
            return studentInfo;
        }

        // POST: api/StudentInfoes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<StudentInfo>> PostStudentInfo([FromForm] StudentInfo studentInfo)
        {
            studentInfo = await UploadImage(studentInfo);
            _context.StudentInfo.Add(studentInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentInfo", new { id = studentInfo.StudentId }, studentInfo);
        }

        // DELETE: api/StudentInfoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentInfo>> DeleteStudentInfo(int id)
        {
            var studentInfo = await _context.StudentInfo.FindAsync(id);
            if (studentInfo == null)
            {
                return NotFound();
            }

            _context.StudentInfo.Remove(studentInfo);
            await _context.SaveChangesAsync();

            return studentInfo;
        }

        private bool StudentInfoExists(int id)
        {
            return _context.StudentInfo.Any(e => e.StudentId == id);
        }
    }
}
