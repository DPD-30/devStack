using AutoMapper;
using CACI.BAL;
using CACI.BAL.ATemplate;
using CACI.BAL.Cases;
using CACI.BAL.Security;
using CACI.BAL.Settings;
using CACI.DAL;
using CACI.Email;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace CACI.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string AllowedOrigins = "_myAllowSpecificOrigins";
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
        
            
            string[] corsOrigins = Configuration.GetSection("CORS:Origins").Value.ToString().Split(',');

            // add automapper support
            services.AddAutoMapper(typeof(Startup));
            services.AddCors(
                x => x.AddPolicy(
                    AllowedOrigins,
                    builder =>
                    {
                        builder.WithOrigins(corsOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin();
                    }

                )
            );


            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddAuthentication(AzureADDefaults.AuthenticationScheme)
                .AddAzureAD(options => Configuration.Bind("AzureAd", options));

            services.Configure<OpenIdConnectOptions>(AzureADDefaults.OpenIdScheme, options =>
            {
                options.Authority += "/v2.0/";
                options.TokenValidationParameters.ValidateIssuer = false;
            });
            services.AddControllers();


            services.AddSwaggerGen(c =>
          {

              c.SwaggerDoc("v1", new OpenApiInfo
              {
                  Version = "v1",
                  Title = "CACI.Web.API",
                  Description = "CACI",
                  TermsOfService = new Uri(Configuration.GetSection("Terms:TermsOfService").Value),
                  Contact = new OpenApiContact
                  {
                      Name = "Martin L. Boyd",
                      Email = "MBoyd@caci.com",
                      Url = new Uri(Configuration.GetSection("Terms:OpenAPIContact").Value),
                  },
                  License = new OpenApiLicense
                  {
                      Name = "Use under LICX",
                      Url = new Uri(Configuration.GetSection("Terms:OpenAPILicense").Value),
                  }
              });
          });

            services.AddSwaggerGen(options =>
            {
                options.CustomSchemaIds(type => type.ToString());
            });
            // specify database connection
            services.AddDbContext<CacidbContext>(cfg => cfg.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddSingleton<IConfiguration>(Configuration);

            //register dependency injection
            services.AddScoped<ISettingsRepository, SettingsRepository>();
            services.AddScoped<IAppSettingService, AppSettingService>();

            services.AddScoped<IClaimsRespository, ClaimsRespository>();
            services.AddScoped<IClaimsService, ClaimsService>();

            services.AddScoped<ICasesRespository, CasesRepository>();
            services.AddScoped<ICasesService, CasesService>();

            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IRoleRepository, RoleRepository>();

            services.AddScoped<IApplicationRepository, ApplicationRepository>();
            services.AddScoped<IApplicationService, ApplicationService>();

            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<ISmtpServer, SmtpServer>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IApplicationService, ApplicationService>();

            services.AddScoped<IATemplateService, ATemplateService>();
            services.AddScoped<IATemplateRepository, ATemplateRepository>();

            services.AddApplicationInsightsTelemetry(Configuration["APPINSIGHTS_INSTRUMENTATIONKEY"]);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseCors(AllowedOrigins);

            app.UseSwagger();

            app.UseCookiePolicy();

            app.UseAuthentication();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
             
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "CACI API");
            });


            app.UseRouting();



            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("WebAPI is up");
            });
        }
    }
}
