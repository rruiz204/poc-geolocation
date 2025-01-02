namespace Server;

public static class Bootstrap
{
  public static void AddVitalServices(this IServiceCollection services, IConfiguration configuration)
  {
    AddCorsPolicy(services, configuration);

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
}