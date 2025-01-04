using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace Server;

public static class Bootstrap
{
  public static void AddVitalServices(this IServiceCollection services, IConfiguration configuration)
  {
    AddCorsPolicy(services, configuration);
    AddRateLimiting(services, configuration);

    services.AddSignalR();
    services.AddSwaggerGen();
    services.AddControllers();
    services.AddEndpointsApiExplorer();
  }

  public static void AddCorsPolicy(IServiceCollection services, IConfiguration configuration)
  {
    var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()!;
    
    services.AddCors(options => {
      options.AddPolicy(name: "Development", policy => {
        policy.WithOrigins(allowedOrigins)
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials();
      });
    });
  }

  public static void AddRateLimiting(IServiceCollection services, IConfiguration configuration)
  {
    services.AddRateLimiter(options => {
      options.AddFixedWindowLimiter(policyName: "FixedWindows", options => {
        options.PermitLimit = 5;
        options.Window = TimeSpan.FromMinutes(1);
        options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        options.QueueLimit = 2;
      });
    });
  }
}