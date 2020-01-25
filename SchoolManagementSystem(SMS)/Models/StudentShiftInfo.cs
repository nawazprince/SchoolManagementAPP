using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class StudentShiftInfo
    {
        [Key]
        [JsonPropertyName("shiftId")]
        public int ShiftId { get; set; }

        [JsonPropertyName("shiftName")]
        public string ShiftName { get; set; }              
        public virtual ICollection<StudentDetailsInfo> StudentDetailsInfos { get; set; }
        public virtual ICollection<ResultEntry> ResultEntry { get; set; }
     
    }
}
