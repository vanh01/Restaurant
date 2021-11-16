using System;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace RestaurantPOS2._0.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Account> GetFullAccount()
        {
            string query = @"SELECT * FROM dbo.USER_ACCOUNT;";

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

            return table.ConvertToList<Account>();
        }

        [HttpGet]
        [Route("clerk")]
        public IEnumerable<Account> GetAccountOfClerk()
        {
            string query = @"SELECT * FROM dbo.USER_ACCOUNT WHERE TypeOfUser = 'Clerk';";

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

            return table.ConvertToList<Account>();
        }
        [HttpGet]
        [Route("login")]
        public Account Login(string username, string password)
        {
            string query = @"SELECT * FROM dbo.USER_ACCOUNT WHERE USERNAME = '" + username + "'" + " AND PASSWORD = '" + password + "';";

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

            List<Account> accounts = table.ConvertToList<Account>();
            if (accounts.Count == 0)
                return new Account();
            return accounts[0];
        }

        [HttpPost]
        public string Post(Account account)
        {
            int n = 0;

            string query = $"INSERT INTO USER_ACCOUNT VALUES ('{account.ID}', '{account.UserName}', '{account.Password}', '{account.FName}','{account.LName}', '{account.BirthOfDate}', '{account.Address}', '{account.PhoneNumber}', 'IMG', '{account.TypeOfUser}');";
            // { DateTime.Now.ToString("yyyy-MM-dd")}
            n = SqlExecutes.Instance.ExecuteNonQuery(query);
            if (n == 1)
                return "Success";
            return "Fail";
        }

    }
}
