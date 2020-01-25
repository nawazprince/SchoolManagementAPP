using SchoolManagementSystem_SMS_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.ViewModels
{
    public class StudentAttViewModel
    {

        public StudentAttViewModel()
        {

        }

        public StudentAttViewModel(StudentDetailsInfo student)
        {
            this.AttendanceId = 0;
            this.AttendanceDate = DateTime.Today;
            this.StudentId = student.StudentId;
            this.StudentName = student.Admission?.StudentName;
            this.Class = student.Section?.Class.ClassName;
            this.Section = student.Section?.SectionName;
            this.Shift = student.Shift?.ShiftName;
        }
        public int AttendanceId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public string Class { get; set; }
        public string Section { get; set; }
        public string Shift { get; set; }
        public bool IsPresent { get; set; }


    }
}
