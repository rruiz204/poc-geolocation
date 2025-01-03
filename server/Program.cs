using Server;
using Server.Src.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddVitalServices(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Development");

app.MapHub<PingHub>("/ping-hub");
app.MapHub<CoordHub>("/coord-hub");
app.MapControllers();

app.Run();