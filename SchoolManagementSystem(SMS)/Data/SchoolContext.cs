using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem_SMS_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SchoolManagementSystem.Models;

namespace SchoolManagementSystem_SMS_.Data
{
    public class SchoolContext : DbContext
    {
        public DbSet<StudentInfo> StudentInfo { get; set; }

        public SchoolContext(DbContextOptions<SchoolContext> opt) : base(opt)
        {
            //Database.SetInitializer(new SchoolDbInitializer());
        }

        public SchoolContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
        public DbSet<SchoolManagementSystem_SMS_.Models.StudentDetailsInfo> StudentDetailsInfo { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.StudentShiftInfo> StudentShiftInfo { get; set; }


        public DbSet<SchoolManagementSystem_SMS_.Models.StudentAttendance> StudentAttendance { get; set; }


        public DbSet<SchoolManagementSystem_SMS_.Models.StudentSectionInfo> StudentSectionInfo { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.Class> Class { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.Subjects> Subjects { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.ExamYear> ExamYear { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.ExamTerm> ExamTerm { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.Exam> Exam { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.Group> Group { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.Result> Result { get; set; }

        public DbSet<SchoolManagementSystem.Models.Employees> Employees { get; set; }
        public DbSet<SchoolManagementSystem_SMS_.Models.Designations> Designations { get; set; }
        public DbSet<SchoolManagementSystem_SMS_.Models.School> School { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.Admission> Admission { get; set; }

        public DbSet<SchoolManagementSystem_SMS_.Models.ResultEntry> ResultEntry { get; set; }

        
    }
}
