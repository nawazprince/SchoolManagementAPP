using Microsoft.AspNetCore.Http;
using SchoolManagementSystem_SMS_.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Models
{
    public class Employees
    {
        [Key]
        [JsonPropertyName("employeeId")]
        public int EmployeesId { get; set; }
       
        [ForeignKey("Designation")]
        [JsonPropertyName("designationId")]
        public int DesignationId { get; set; }
      
        [DataType(DataType.Text)]
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }
        
        [DataType(DataType.Text)]
        [JsonPropertyName("lastName")]
        public string LastName { get; set; }
       
        [JsonPropertyName("fullName")]
        public string FullName => $"{FirstName} {LastName}";
       
        [JsonPropertyName("gender")]
        public string Gender { get; set; }
        
        [JsonPropertyName("joiningDate")]
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime JoiningDate { get; set; }
      
        [JsonPropertyName("address")]
        public string Address { get; set; }
       
        [JsonPropertyName("contactNumber")]

        [DataType(DataType.Text)]
        public string ContactNumber { get; set; }

        //[DataType(DataType.EmailAddress)]
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [ScaffoldColumn(false)]
        //[DataType(DataType.ImageUrl)]
        public string ImagePath { get; set; }
        [NotMapped]
        public IFormFile Image { get; set; }
        public virtual Designations Designation { get; set; }
    }
    
}
