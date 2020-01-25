using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class Exam
    {
        [Key]
        [JsonPropertyName("examId")]
        public int ExamId { get; set; }

        [JsonPropertyName("examDate")]
        public DateTime ExamDate { get; set; } = DateTime.Today;


        [ForeignKey("Class")]
        [JsonPropertyName("classId")]
        public int ClassId { get; set; }

        [ForeignKey("ExamYear")]
        [JsonPropertyName("examYearId")]
        public int ExamYearId { get; set; }

        [ForeignKey("ExamTerm")]
        [JsonPropertyName("examTermId")]
        public int ExamTermId { get; set; }


        [ForeignKey("Subjects")]
        [JsonPropertyName("subjectId")]
        public int SubjectId { get; set; }

        public ICollection<Result> Result { get; set; }
      
   
       
        public virtual Class Class { get; set; }
        public virtual ExamTerm ExamTerm { get; set; }
        public virtual ExamYear ExamYear { get; set; }
        public virtual Subjects Subjects { get; set; }

    }
}
