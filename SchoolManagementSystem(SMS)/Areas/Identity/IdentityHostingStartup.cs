using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SchoolManagementSystem_SMS_.Data;
using SchoolManagementSystem_SMS_.Models;

[assembly: HostingStartup(typeof(SchoolManagementSystem_SMS_.Areas.Identity.IdentityHostingStartup))]
namespace SchoolManagementSystem_SMS_.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}