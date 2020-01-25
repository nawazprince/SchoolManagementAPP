using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class ResultEntry
    {

        [Key]
        [JsonPropertyName("resultEntryId")]
        public int ResultEntryId { get; set; }

        [ForeignKey("StudentShiftInfo")]
        [JsonPropertyName("shiftId")]
        public int ShiftId { get; set; }

        [ForeignKey("Class")]
        [JsonPropertyName("classId")]
        public int ClassId { get; set; }

        [ForeignKey("StudentSectionInfo")]
        [JsonPropertyName("sectionId")]
        public int SectionId { get; set; }

        [ForeignKey("ExamTerm")]
        [JsonPropertyName("examTermId")]
        public int ExamTermId { get; set; }


        [ForeignKey("Subjects")]
        [JsonPropertyName("subjectId")]
        public int SubjectId { get; set; }

        [ForeignKey("Group")]
        [JsonPropertyName("groupId")]
        public int GroupId { get; set; }


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


        [JsonPropertyName("resultDate")]
        public DateTime ResultDate { get; set; }



        public virtual ExamTerm ExamTerms { get; set; }

        public virtual StudentDetailsInfo StudentDetails { get; set; }

        public virtual StudentShiftInfo Shift { get; set; }
  
        public virtual Class Class { get; set; }
      
        public virtual Group Group { get; set; }
    
        public virtual StudentSectionInfo Section { get; set; }

    }
}
