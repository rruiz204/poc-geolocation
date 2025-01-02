using Microsoft.AspNetCore.Mvc;

namespace Server.Src.Controllers;

[ApiController]
[Route("api/")]
public class PingController : ControllerBase
{
  [HttpGet("ping")]
  public IActionResult Ping()
  {
    return Ok("pong");
  }
}