using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class Subjects
    {
        [Key]
        [JsonPropertyName("subjectId")]
        public int SubjectId { get; set; }
        
        [ForeignKey("Class")]

        [JsonPropertyName("classId")]
        public int ClassId { get; set; }

        [JsonPropertyName("subjectCode")]
        public string SubjectCode { get; set; }

        [JsonPropertyName("subjectName")]

        public string SubjectName { get; set; }

        [JsonPropertyName("mcqMarks")]
        public int MCQMarks { get; set; }

        [JsonPropertyName("writtenMarks")]
        public int WrittenMarks { get; set; }


        [JsonPropertyName("practicalMarks")]
        public int PracticalMarks { get; set; }



        [JsonPropertyName("ctMarks")]
        public int CTMarks { get; set; }

        [JsonPropertyName("totalMarks")]
        public int TotalMarks =>  MCQMarks + WrittenMarks + PracticalMarks + CTMarks;
        
        [JsonPropertyName("passMarks")]
        public int PassMarks { get; set; }

        [ForeignKey("Group")]      
        public int GroupId { get; set; }
        public virtual Class Class { get; set; }
        public virtual Group Group { get; set; }

        public virtual ICollection<ResultEntry> ResultEntry { get; set; }
        public ICollection<Exam> Exam { get; set; }
       

    }
}
