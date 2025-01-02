namespace Server;

public static class Bootstrap
{
  public static void AddVitalServices(this IServiceCollection services)
  {
    services.AddSignalR();
    services.AddSwaggerGen();
    services.AddControllers();
    services.AddEndpointsApiExplorer();
  }
}