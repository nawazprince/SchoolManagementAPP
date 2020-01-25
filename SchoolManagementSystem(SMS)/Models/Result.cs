using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class Result
    {
        [Key]
        [JsonPropertyName("resultId")]
        public int ResultId { get; set; }

        [ForeignKey("Exam")]
        [JsonPropertyName("examId")]
        public int ExamId { get; set; }

        [JsonPropertyName("resultDate")]
        public DateTime ResultDate { get; set; }

        [ForeignKey("StudentDetails")]
        [JsonPropertyName("studentDetailsId")]
        public int StudentDetailsId { get; set; }

        [JsonPropertyName("mcqMarks")]
        public int MCQMarks { get; set; }

        [JsonPropertyName("writtenMarks")]
        public int WrittenMarks { get; set; }

        [JsonPropertyName("practical")]
        public int Practical { get; set; }

        [JsonPropertyName("ctMarks")]
        public int CTMarks { get; set; }

        [JsonPropertyName("grade")]
        public string Grade { get; set; }

        public virtual Exam Exam { get; set; }
  
        public virtual StudentDetailsInfo StudentDetails { get; set; }
      




        [ForeignKey("ShiftId")]
        public virtual StudentShiftInfo Shift { get; set; }


        [ForeignKey("ClassId")]
        public virtual Class Class { get; set; }


        [ForeignKey("GroupId")]
        public virtual Group Group { get; set; }


        [ForeignKey("SectionId")]
        public virtual StudentSectionInfo Section { get; set; }
    }
}
