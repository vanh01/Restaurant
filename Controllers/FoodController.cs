using System.IO;
using System;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;

namespace RestaurantPOS2._0
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        public static IWebHostEnvironment _environment;
        public FoodController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
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
        public List<Food> GetFoods()
        {
            string query = "SELECT * FROM FOOD";

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query).Result;

            return table.ConvertToList<Food>();
        }

        [HttpGet("category")]
        public List<string> GetCategory()
        {
            string query = $"SELECT Category FROM FOOD GROUP BY Category;";

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query).Result;
            List<string> strs = new List<string>();

            foreach (DataRow item in table.Rows)
            {
                strs.Add(item["Category"].ToString());
            }
            return strs;
        }

        [HttpPut]
        public async Task<string> PutFoods([FromForm] FoodFull foodFull, string userName, string password)
        {
            string pathImg = "";
            string fileName = "";
            if (foodFull.file != null)
            {
                fileName = DateTime.Now.ToString("yyyy-MM-dd-hh-mm-ss") + Path.GetExtension(foodFull.file.FileName);
                pathImg = ", PathImg = '" + fileName + "'";
            }
            string query = $"UPDATE FOOD SET Name = '{foodFull.Name}', Description = '{foodFull.Description}', Price = '{foodFull.Price}'{pathImg} , Category = '{foodFull.Category}' WHERE FOOD.FoodID = {foodFull.FoodID}";

            if (GetTypeOfAccount(userName, password) == "Manager")
            {
                int n = await SqlExecutes.Instance.ExecuteNonQuery(query);

                if (fileName != "")
                {
                    if (!Directory.Exists("./Images"))
                        Directory.CreateDirectory("./Images");

                    using (FileStream fileStream = System.IO.File.Create("./Images/" + fileName))
                    {
                        await foodFull.file.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                    }
                }
                if (n == 1)
                    return "Success";
                return "Fail";
            }

            return "Fail";
        }

        [HttpPost]
        public async Task<string> PostFoods([FromForm] FoodFull foodFull, string userName, string password)
        {
            string fileName = DateTime.Now.ToString("yyyy-MM-dd-hh-mm-ss") + Path.GetExtension(foodFull.file.FileName);
            string query = $"INSERT INTO FOOD VALUES ('{foodFull.Name}', '{foodFull.Description}', '{foodFull.Price}', '{fileName}', '{foodFull.Category}' , 1, 5);";

            if (GetTypeOfAccount(userName, password) == "Manager")
            {
                int n = SqlExecutes.Instance.ExecuteNonQuery(query).Result;

                if (!Directory.Exists("./Images"))
                    Directory.CreateDirectory("./Images");

                using (FileStream fileStream = System.IO.File.Create("./Images/" + fileName))
                {
                    await foodFull.file.CopyToAsync(fileStream);
                    await fileStream.FlushAsync();
                }
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
                int n = SqlExecutes.Instance.ExecuteNonQuery(query).Result;

                if (n == 1)
                    return "Success";
                return "Fail";
            }

            return "Fail";
        }

    }
}