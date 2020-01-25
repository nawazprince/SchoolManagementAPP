using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class StudentDetailsInfo
    {
        [Key]
        [ForeignKey("StudentInfo")]
        [JsonPropertyName("studentDetailsId")]
        public int StudentDetailsId { get; set; }
        [ForeignKey("Admission")]
        [JsonPropertyName("studentId")]
        public int StudentId { get; set; }


        [JsonPropertyName("rollNo")]
        public int RollNo { get; set; }

        [JsonPropertyName("shiftId")]
        public int ShiftId { get; set; }

        [JsonPropertyName("classId")]

        public int ClassId { get; set; }

        [JsonPropertyName("groupId")]
        public int GroupId { get; set; }

        [JsonPropertyName("sectionId")]
        public int SectionId { get; set; }
        [JsonPropertyName("admissionDate")]
        public DateTime AdmissionDate { get; set; } = DateTime.Today;


        [ForeignKey("ShiftId")]
        public virtual StudentShiftInfo Shift { get; set; }


        [ForeignKey("ClassId")]
        public virtual Class Class { get; set; }


        [ForeignKey("GroupId")]
        public virtual Group Group { get; set; }


        [ForeignKey("SectionId")]
        public virtual StudentSectionInfo Section { get; set; }

        public virtual Admission Admission { get; set; }
        public virtual ICollection<Result> Result { get; set; }
        //public ICollection<ResultSheet> ResultSheets { get; set; }

        public virtual ICollection<ResultEntry> ResultEntry { get; set; }

    }
}
