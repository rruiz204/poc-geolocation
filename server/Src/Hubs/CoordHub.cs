using Microsoft.AspNetCore.SignalR;
using Server.Src.Entities;

namespace Server.Src.Hubs;

public class CoordHub : Hub
{
  public override Task OnConnectedAsync()
  {
    Console.WriteLine($"New Connection ID in Coords: {Context.ConnectionId}");
    return base.OnConnectedAsync();
  }

  [HubMethodName("SendCoords")]
  public async Task SendCoords(Coordinates coords)
  {
    Console.WriteLine($"New Coords: {coords.Name} - {coords.Latitude} - {coords.Longitude}");
    await Clients.Others.SendAsync("ReceiveCoords", coords);
  }
}