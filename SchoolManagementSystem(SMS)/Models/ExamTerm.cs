using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class ExamTerm
    {
        [Key]
        [JsonPropertyName("examTermId")]
        public int ExamTermId { get; set; }
        [JsonPropertyName("examTermName")]
        public string ExamTermName { get; set; }

        public ICollection<Exam> Exam { get; set; }
        public virtual ICollection<ResultEntry> ResultEntry { get; set; }
    }
}
