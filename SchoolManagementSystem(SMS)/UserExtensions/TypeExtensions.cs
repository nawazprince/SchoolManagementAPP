using SchoolManagementSystem_SMS_.Data;
using SchoolManagementSystem_SMS_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.UserExtensions
{
    public static class TypeExtensions
    {
        public static void SeedData(this SchoolContext context)
        {
            context.Database.EnsureCreated();

            using (var tran = context.Database.BeginTransaction())
            {
                try
                {

                    if (!context.StudentShiftInfo.Any())
                    {
                        context.StudentShiftInfo.AddRange
                        (
                        new StudentShiftInfo() { ShiftName = "Morning" },
                        new StudentShiftInfo() { ShiftName = "Day" }
                        );
                        context.SaveChanges();
                    }

                    if (!context.ExamYear.Any())
                    {
                        context.ExamYear.AddRange
                        (
                        new ExamYear() { ExamYearDate = 2019 },
                        new ExamYear() { ExamYearDate = 2020 }
                        );
                        context.SaveChanges();
                    }

                    if (!context.ExamTerm.Any())
                    {
                        context.ExamTerm.AddRange
                        (
                        new ExamTerm() { ExamTermName = "First Term" },
                        new ExamTerm() { ExamTermName = "Second Term" }
                        );
                        context.SaveChanges();
                    }
                    if (!context.Class.Any())
                    {

                        Class c1 = new Class() { ClassName = "Six" };
                        Class c2 = new Class() { ClassName = "Seven" };
                        context.Class.AddRange(c1,c2);
                        context.SaveChanges();

                        StudentSectionInfo s1_c1 = new StudentSectionInfo()
                        {
                            ClassId = c1.ClassId,
                            SectionName = "Section A"
                        };

                        StudentSectionInfo s2_c1 = new StudentSectionInfo()
                        {
                            ClassId = c1.ClassId,
                            SectionName = "Section B"
                        };
                        context.StudentSectionInfo.AddRange(s1_c1, s2_c1);
                        context.SaveChanges();
                    }


                    if (!context.Designations.Any())
                    {
                        context.Designations.AddRange
                        (
                        new Designations() { DesignationName = "Teacher" },
                        new Designations() { DesignationName = "Staff" }
                        );
                        context.SaveChanges();
                    }





                    tran.Commit();
                }
                catch (Exception e)
                {
                    tran.Rollback();
                    Console.WriteLine(e);
                }
            }


        }
    }
}
