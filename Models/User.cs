using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace StackUnderflow.Models
{
    public class UserSignIn
    {
        [EmailAddress]
        public string Email { get; set; }

        [MinLength(6)]
        public string Password { get; set; }
    }

    public class UserRegistration : UserSignIn
    {
        [Required]
        public string Username { get; set; }
    }

    public class User
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        internal string Hash { get; set; }

        internal ClaimsPrincipal _principal;

        internal void SetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim("Id", Id),
                new Claim(ClaimTypes.Email, Email),
                new Claim(ClaimTypes.Name, Username)
            };
            var userIdentity = new ClaimsIdentity(claims, "login");
            _principal = new ClaimsPrincipal(userIdentity);
        }
    }
}