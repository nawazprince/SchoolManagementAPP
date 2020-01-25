using SchoolManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class Designations
    {
        [Key]
        [JsonPropertyName("designationId")]
        public int DesignationId { get; set; }
        [JsonPropertyName("designationName")]
        public string DesignationName { get; set; }

        public ICollection<Employees> Employees { get; set; }
    }
}
