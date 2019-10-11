using System;
using StackUnderflow.Data;
using StackUnderflow.Models;

namespace StackUnderflow.Services
{
    public class AccountService
    {
        private readonly AccountRepository _repo;

        public User Register(UserRegistration creds)
        {
            var user = new User();
            user.Id = Guid.NewGuid().ToString();
            user.Email = creds.Email;
            user.Username = creds.Username;
            user.Hash = BCrypt.Net.BCrypt.HashPassword(creds.Password);

            _repo.Register(user);
            return user;
        }

        public User SignIn(UserSignIn creds)
        {
            var user = _repo.GetUserByEmail(creds.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(creds.Password, user.Hash))
            {
                throw new Exception("Invalid Email or Password");
            }
            return user;
        }

        public AccountService(AccountRepository repo)
        {
            _repo = repo;
        }
    }
}