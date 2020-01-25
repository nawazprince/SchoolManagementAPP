using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class Group
    {
        [Key]
        [JsonPropertyName("groupId")]
        public int GroupId { get; set; }
        [JsonPropertyName("groupName")]
        public string GroupName { get; set; }
        
        public ICollection<Subjects> Subjects { get; set; }
        public ICollection<StudentDetailsInfo> studentDetails { get; set; }
        //public ICollection<ResultSheet> ResultSheets { get; set; } 
        public virtual ICollection<ResultEntry> ResultEntry { get; set; }
    }
}
