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
        private string GetTypeOfAccount(string username, string password)
        {
            string query = @"EXEC [SE].[DBO].Login @userName = '" + username + "', @password = '" + password + "';";
            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

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

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

            return table.ConvertToList<Account>();
        }

        [HttpGet]
        [Route("login")]
        public Account Login(string username, string password)
        {
            string query = @"EXEC [SE].[DBO].Login @userName = '" + username + "', @password = '" + password + "';";

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

            string query = $"INSERT INTO USER_ACCOUNT VALUES ('{account.UserName}', '{account.Password}', '{account.FName}','{account.LName}', '{account.BirthOfDate}', '{account.Address}', '{account.PhoneNumber}', 'IMG', '{account.TypeOfUser}');";
            // { DateTime.Now.ToString("yyyy-MM-dd")}
            n = SqlExecutes.Instance.ExecuteNonQuery(query);
            if (n == 1)
                return "Success";
            return "Fail";
        }

        [HttpDelete]
        public string Delete(Account account)
        {
            string query = @"DELETE FROM USER_ACCOUNT WHERE USER_ACCOUNT.ID = '" + account.ID + "';";

            int n = SqlExecutes.Instance.ExecuteNonQuery(query);
            if (n == 1)
                return "Success";

            return "Fail";
        }

        [HttpPut]
        public string Update(Account account)
        {
            string query = $"UPDATE USER_ACCOUNT SET FName = '{account.FName}' , LName = '{account.LName}' , BirthOfDate = '{account.BirthOfDate}' , Address = '{account.Address}' , PhoneNumber = '{account.PhoneNumber}' WHERE ID = {account.ID};";

            if (GetTypeOfAccount(account.UserName, account.Password) == "")
                return "UserName or password invalid";

            int n = SqlExecutes.Instance.ExecuteNonQuery(query);
            if (n == 1)
                return "Success";

            return "Fail";
        }

    }
}
