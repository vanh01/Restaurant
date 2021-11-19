using System;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace RestaurantPOS2._0
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private string GetTypeOfAccount(string userName, string password)
        {
            string query = @"EXEC [SE].[DBO].Login @userName = '" + userName + "', @password = '" + password + "';";
            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

            List<Account> accounts = table.ConvertToList<Account>();
            if (accounts.Count == 0)
                return "";
            return accounts[0].TypeOfUser;
        }

        [HttpGet]
        public List<Food> GetFoods()
        {
            string query = "SELECT * FROM FOOD";

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

            return table.ConvertToList<Food>();
        }

        [HttpGet("category")]
        public List<string> GetCategory()
        {
            string query = $"SELECT Category FROM FOOD GROUP BY Category;";

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);
            List<string> strs = new List<string>();

            foreach (DataRow item in table.Rows)
            {
                strs.Add(item["Category"].ToString());
            }
            return strs;
        }

        [HttpPut]
        public string PutFoods([FromBody] Food food, string userName, string password)
        {
            string query = $"UPDATE FOOD SET Name = '{food.Name}', Description = '{food.Description}', Price = '{food.Price}', PathImg = '{food.PathImg}', Category = '{food.Category}' WHERE FOOD.FoodID = {food.FoodID}";

            if (GetTypeOfAccount(userName, password) == "Manager")
            {
                int n = SqlExecutes.Instance.ExecuteNonQuery(query);

                if (n == 1)
                    return "Success";
                return "Fail";
            }

            return "Fail";
        }

        [HttpPost]
        public string PostFoods([FromBody] Food food, string userName, string password)
        {
            string query = $"INSERT INTO FOOD VALUES ('{food.Name}', '{food.Description}', '{food.Price}', '{food.PathImg}', '{food.Category}' , 1, 5);";

            if (GetTypeOfAccount(userName, password) == "Manager")
            {
                int n = SqlExecutes.Instance.ExecuteNonQuery(query);

                if (n == 1)
                    return "Success";
                return "Fail";
            }

            return "Fail";
        }

        [HttpDelete]
        public string DeleteFood([FromBody] Food food, string userName, string password)
        {
            string query = $"DELETE FROM FOOD WHERE FoodID = {food.FoodID}";

            if (GetTypeOfAccount(userName, password) == "Manager")
            {
                int n = SqlExecutes.Instance.ExecuteNonQuery(query);

                if (n == 1)
                    return "Success";
                return "Fail";
            }

            return "Fail";
        }

    }
}