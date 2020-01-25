using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class School
    {




        [Key]
        [JsonPropertyName("schoolId")]
        public int SchoolId { get; set; }

        [JsonPropertyName("schoolName")]
        public string SchoolName { get; set; }

        [JsonPropertyName("schoolAddress")]
        public string Address { get; set; }

        [JsonPropertyName("registrationNo")]
        public string RegistrationNo { get; set; }

    }
}
