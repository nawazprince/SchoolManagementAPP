using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class StudentSectionInfo
    {
        [Key]
        [JsonPropertyName("sectionId")]
        public int SectionId { get; set; }

      

        [JsonPropertyName("sectionName")]
        public string SectionName { get; set; }

       
        [JsonPropertyName("classId")]
        //[ForeignKey("Class")]
        public int ClassId { get; set; }


        //
        //[JsonPropertyName("shiftId")]
        //public int ShiftId { get; set; }




        public virtual ICollection<StudentDetailsInfo> StudentDetailsInfo { get; set; }
        //public virtual ICollection<StudentShiftInfo> StudentShiftInfo { get; set; }
        [ForeignKey("ClassId")]
        public virtual Class Class { get; set; }
        public virtual ICollection<ResultEntry> ResultEntry { get; set; }


    }
}
