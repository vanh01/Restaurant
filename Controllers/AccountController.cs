using System.Reflection.Metadata.Ecma335;
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
        private string GetTypeOfAccount(string userName, string password)
        {
            string query = @"EXEC [SE].[DBO].Login @userName = '" + userName + "', @password = '" + password + "';";
            DataTable table = SqlExecutes.Instance.ExecuteQuery(query).Result;

            List<Account> accounts = table.ConvertToList<Account>();
            if (accounts.Count == 0)
                return "";
            return accounts[0].TypeOfUser;
        }

        [HttpGet]
        [Route("clerk")]
        public IEnumerable<Account> GetAccountOfClerk(string username, string password)
        {
            string query = @"SELECT * FROM dbo.USER_ACCOUNT WHERE TypeOfUser = 'Clerk';";

            if (GetTypeOfAccount(username, password) != "Manager")
                return new List<Account>();

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query).Result;

            return table.ConvertToList<Account>();
        }

        [HttpGet]
        [Route("login")]
        public Account Login(string username, string password)
        {
            string query = @"EXEC [SE].[DBO].Login @userName = '" + username + "', @password = '" + password + "';";

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query).Result;

            List<Account> accounts = table.ConvertToList<Account>();
            if (accounts.Count == 0)
                return new Account();
            return accounts[0];
        }

        [HttpPost]
        public string Post(Account account)
        {
            int n = 0;

            string query = $"INSERT INTO USER_ACCOUNT VALUES ('{account.UserName}', '{account.Password}', N'{account.FName}', N'{account.LName}', '{account.BirthOfDate}', N'{account.Address}', N'{account.PhoneNumber}', 'IMG', N'{account.TypeOfUser}');";
            // { DateTime.Now.ToString("yyyy-MM-dd")}
            if (GetTypeOfAccount(account.UserName, account.Password) != "")
                return "Fail";
            n = SqlExecutes.Instance.ExecuteNonQuery(query).Result;
            if (n == 1)
                return "Success";
            return "Fail";
        }

        [HttpDelete]
        public string Delete(Account account)
        {
            string query = @"DELETE FROM USER_ACCOUNT WHERE USER_ACCOUNT.UserName = '" + account.UserName + "';";

            int n = SqlExecutes.Instance.ExecuteNonQuery(query).Result;
            if (n == 1)
                return "Success";

            return "Fail";
        }

        [HttpPut]
        public string Update(Account account)
        {
            string query = $"UPDATE USER_ACCOUNT SET FName = N'{account.FName}' , LName = N'{account.LName}' , BirthOfDate = N'{account.BirthOfDate}' , Address = N'{account.Address}' , PhoneNumber = N'{account.PhoneNumber}' WHERE ID = {account.ID};";

            if (GetTypeOfAccount(account.UserName, account.Password) == "")
                return "Fail";

            int n = SqlExecutes.Instance.ExecuteNonQuery(query).Result;
            if (n == 1)
                return "Success";

            return "Fail";
        }

        [HttpPut("password")]
        public string UpdatePassword(string newPassword, Account account)
        {
            string query = $"UPDATE USER_ACCOUNT SET Password = '{newPassword}' WHERE UserName = '{account.UserName}' AND Password = '{account.Password}';";

            if (GetTypeOfAccount(account.UserName, account.Password) == "")
                return "Fail";

            int n = SqlExecutes.Instance.ExecuteNonQuery(query).Result;
            if (n == 1)
                return "Success";

            return "Fail";
        }

    }
}
