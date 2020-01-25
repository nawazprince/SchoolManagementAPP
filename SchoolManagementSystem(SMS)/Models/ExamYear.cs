using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class ExamYear
    {
        [Key]
        [JsonPropertyName("examYearId")]
        public int ExamYearId { get; set; }
        [JsonPropertyName("examYearDate")]
        public int ExamYearDate { get; set; }

        public ICollection<Exam> Exam { get; set; }
  
    }
}
