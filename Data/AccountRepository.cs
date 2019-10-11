using System.Data;
using Dapper;
using StackUnderflow.Models;

namespace StackUnderflow.Data
{
  public class AccountRepository
  {
    private readonly IDbConnection _db;

    public User Register(User userData)
    {
      var sql = @"
            INSERT INTO users
            (id, email, username, hash)
            VALUES
            (@Id, @Email, @Username, @Hash)
            ";
      _db.Execute(sql, new
      {
        Id = userData.Id,
          Email = userData.Email,
          Username = userData.Username,
          Hash = userData.Hash
      });
      return userData;
    }

    public User GetUserByEmail(string email)
    {
      var sql = "SELECT * FROM users WHERE email = @email";
      return _db.QueryFirstOrDefault<User>(sql, new { email });
    }

    public AccountRepository(IDbConnection db)
    {
      _db = db;
    }

  }
}