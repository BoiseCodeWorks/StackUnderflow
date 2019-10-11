using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using StackUnderflow.Models;
using StackUnderflow.Services;

namespace StackUnderflow.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] UserRegistration creds)
        {
            try
            {
                User u = _accountService.Register(creds);
                u.SetClaims();
                await HttpContext.SignInAsync(u._principal);
                return Ok(u);
            }
            catch (MySqlException e)
            {
                if (e.Message.Contains("email"))
                {
                    return BadRequest("The Email is already in use");
                }
                return Unauthorized("Unauthorized access to DB please contact the administrator @ a@b.com");
            }
            catch (System.Exception e)
            {
                return UnprocessableEntity(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> SignIn([FromBody] UserSignIn creds)
        {
            try
            {
                User u = _accountService.SignIn(creds);
                u.SetClaims();
                await HttpContext.SignInAsync(u._principal);
                return Ok(u);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpDelete("logout")]
        public async Task<ActionResult<bool>> Logout()
        {
            try
            {
                await HttpContext.SignOutAsync();
                return Ok(true);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [HttpGet("Authenticate")]
        public ActionResult<User> Authenticate()
        {
            try
            {
                var userId = HttpContext.User.FindFirst("Id").Value;
                var username = HttpContext.User.FindFirst(ClaimTypes.Name).Value;
                var email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
                var user = new User()
                {
                    Id = userId,
                    Email = email,
                    Username = username
                };
                return Ok(user);
            }
            catch (Exception e)
            {
                //TODO Uh-o something bad lets investigate
                return BadRequest(e.Message);
            }
        }

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

    }
}