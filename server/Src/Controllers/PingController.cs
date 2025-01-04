using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Server.Src.Controllers;

[ApiController]
[Route("api/")]
[EnableRateLimiting("FixedWindows")]
public class PingController : ControllerBase
{
  [HttpGet("ping-rest")]
  public IActionResult Ping()
  {
    return Ok(new { ping = "pong" });
  }
}