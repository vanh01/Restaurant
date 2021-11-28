using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Threading.Tasks;

namespace RestaurantPOS2._0.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private string GetTypeOfAccount(string username, string password)
        {
            string query = @"EXEC [SE].[DBO].Login @userName = '" + username + "', @password = '" + password + "';";
            DataTable table = SqlExecutes.Instance.ExecuteQuery(query).Result;

            List<Account> accounts = table.ConvertToList<Account>();
            if (accounts.Count == 0)
                return "";
            return accounts[0].TypeOfUser;
        }

        [HttpGet]
        public IEnumerable<Ordered> GetAllOrdersOfCustomer(string UserName, string Password)
        {
            if (GetTypeOfAccount(UserName, Password) == "Customer")
            {
                string query = @"SELECT PAYMENT.CustomerID, PAYMENT.OrderID, PAYMENT.Name, PAYMENT.Address, PAYMENT.PhoneNumber, ORDER_FOOD.Status, ORDER_FOOD.Date, PAYMENT.Paytype, PAYMENT.Total
                            FROM PAYMENT, ORDER_FOOD, USER_ACCOUNT
                            WHERE PAYMENT.OrderID = ORDER_FOOD.OrderID AND PAYMENT.CustomerID = USER_ACCOUNT.ID AND USER_ACCOUNT.UserName = '" + UserName + "' AND USER_ACCOUNT.Password = '" + Password + "';";

                DataTable table = SqlExecutes.Instance.ExecuteQuery(query).Result;

                return table.ConvertToList<Ordered>();
            }
            return new List<Ordered>();
        }

        [HttpGet("food")]
        public IEnumerable<foodsOrdered> GetFoodsOrderedOfOrder(string CustomerID, string OrderID, string UserName, string Password)
        {
            if (GetTypeOfAccount(UserName, Password) != "")
            {
                string query = $"SELECT FOOD.Name, FOOD.Price, ORDERED.Quantity, ORDERED.OrderNote FROM dbo.ORDERED, dbo.FOOD WHERE ORDERED.FoodID = FOOD.FoodID AND ORDERED.CustomerID = {CustomerID} AND ORDERED.OrderID = {OrderID};";

                DataTable table = SqlExecutes.Instance.ExecuteQuery(query).Result;

                return table.ConvertToList<foodsOrdered>();
            }
            return new List<foodsOrdered>();
        }

        [HttpGet("all")]
        public IEnumerable<Ordered> GetAllOrders(string UserName, string Password)
        {
            string s = GetTypeOfAccount(UserName, Password);
            if (s == "Manager" || s == "Clerk")
            {
                string query = @"SELECT PAYMENT.CustomerID, PAYMENT.OrderID, PAYMENT.Name, PAYMENT.Address, PAYMENT.PhoneNumber, ORDER_FOOD.Status, ORDER_FOOD.Date,PAYMENT.Paytype ,PAYMENT.Total
                            FROM PAYMENT, ORDER_FOOD, USER_ACCOUNT
                            WHERE PAYMENT.OrderID = ORDER_FOOD.OrderID AND PAYMENT.CustomerID = USER_ACCOUNT.ID;";

                DataTable table = SqlExecutes.Instance.ExecuteQuery(query).Result;

                return table.ConvertToList<Ordered>();
            }
            return new List<Ordered>();
        }

        [HttpPut("confirm")]
        public string EditAllOrders(string Status, string OrderID, string UserName, string Password)
        {
            if (GetTypeOfAccount(UserName, Password) == "Clerk")
            {
                string query = @"UPDATE ORDER_FOOD SET Status = N'" + Status + "' WHERE ORDER_FOOD.OrderID = N'" + OrderID + "';";

                int n = SqlExecutes.Instance.ExecuteNonQuery(query).Result;
                if (n == 1)
                    return "Success";
                return "Fail";
            }
            return "Fail";
        }

        [HttpPost("ordered")]
        public String CusOrder([FromBody] AllInfo allInfo, string userName, string password)
        {
            if (GetTypeOfAccount(userName, password) == "Customer")
            {
                string query2 = $"INSERT INTO ORDER_FOOD VALUES ( N'{allInfo.Date}', N'Waitting', 1);SELECT TOP 1 OrderID FROM ORDER_FOOD ORDER BY OrderID DESC; ";
                string OrderID = SqlExecutes.Instance.ExecuteQuery(query2).Result.Rows[0]["OrderID"].ToString();
                string query = $"INSERT INTO PAYMENT VALUES ({allInfo.CustomerID}, {OrderID}, N'{allInfo.Paytype}', N'{allInfo.Total}', N'{allInfo.Name}', N'{allInfo.Address}', N'{allInfo.PhoneNumber}');";
                SqlExecutes.Instance.ExecuteNonQuery(query).Wait();
                foreach (var item in allInfo.inforFoods)
                {
                    string query4 = $"INSERT INTO ORDERED VALUES ({allInfo.CustomerID}, {OrderID}, {item.FoodID}, {item.Quantity}, N'{item.OrderNote}');";
                    SqlExecutes.Instance.ExecuteNonQuery(query4).Wait();
                }
                return "Success";
            }
            return "Fail";
        }
    }
}