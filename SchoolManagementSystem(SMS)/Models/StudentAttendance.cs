using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class StudentAttendance
    {
        [Key]
        public int AttendanceId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public int StudentId { get; set; }
        public bool IsPresent { get; set; }
    }
}
