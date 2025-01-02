using Microsoft.AspNetCore.SignalR;

namespace Server.Src.Hubs;

public class PingHub : Hub
{
  public override Task OnConnectedAsync()
  {
    Console.WriteLine($"New Connection ID: {Context.ConnectionId}");
    return base.OnConnectedAsync();
  }
}