using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem_SMS_.Models
{
    public class StudentInfo
    {
        [Key]
        [JsonPropertyName("studentId")]
        public int StudentId { get; set; }

        [JsonPropertyName("studentName")]
        public string StudentName { get; set; }
        [JsonPropertyName("fatherName")]
        public string FatherName { get; set; }
        [JsonPropertyName("motherName")]
        public string MotherName { get; set; }
        [JsonPropertyName("dob")]
        public DateTime DateOfBirth { get; set; } = DateTime.Today;
        [JsonPropertyName("gender")]
        public string Gender { get; set; }
        public BloodGroup BloodGroup { get; set; } = BloodGroup.A_Positive;

        [NotMapped]
        [JsonPropertyName("bloodGroupText")]
        public string BloodGroupText => BloodGroup.ToString();

        [JsonPropertyName("nationality")]
        public string Nationality { get; set; }
        [JsonPropertyName("brithcertificateNumber")]
        public string BirthCertificateNumber { get; set; }
        [JsonPropertyName("relegion")]
        public string Relegion { get; set; }
       
        [JsonPropertyName("presentAddress")]
        public string PresentAddress { get; set; }
       
      
        [JsonPropertyName("permanentAddress")]
        public string PermanentAddress { get; set; }
        
        [JsonPropertyName("gurdianName")]
        public string GurdianName { get; set; }
       
        [JsonPropertyName("cell")]
        public string Cell { get; set; }
     
        [ScaffoldColumn(false)]
        //[DataType(DataType.ImageUrl)]
        public string ImagePath { get; set; }

        [NotMapped]
        public IFormFile Image { get; set; }


     
        public virtual ICollection<StudentDetailsInfo> StudentDetailsInfos { get; set; }
        

    }
}
