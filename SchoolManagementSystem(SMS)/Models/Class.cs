using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class Class
    {
        [Key]
        [JsonPropertyName("classId")]
        public int ClassId { get; set; }
        [JsonPropertyName("className")]
        public string ClassName { get; set; }

        public ICollection<Exam> Exam { get; set; }

        public ICollection<StudentSectionInfo> StudentSectionInfo { get; set; }

        public virtual ICollection<StudentDetailsInfo> StudentDetailsInfos { get; set; }
        public virtual ICollection<ResultEntry> ResultEntry { get; set; }



    }
}
