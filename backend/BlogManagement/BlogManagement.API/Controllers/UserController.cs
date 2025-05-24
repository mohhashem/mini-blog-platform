using Domain.DTOs;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace BlogManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var token = await _userService.Login(dto);
            if (token == null)
                return Unauthorized("Invalid username or password");

            return Ok(new { token });
        }
    }
}
