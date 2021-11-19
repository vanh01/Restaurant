using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace RestaurantPOS2._0.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
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
        public IEnumerable<Pay_Ord> GetAllOrdersOfCustomer(string UserName, string Password)
        {
            if (GetTypeOfAccount(UserName, Password) == "Customer")
            {
                string query = @"SELECT PAYMENT.CustomerID, PAYMENT.OrderID, USER_ACCOUNT.FName, USER_ACCOUNT.Address, USER_ACCOUNT.PhoneNumber, ORDER_FOOD.Available, ORDER_FOOD.Date,PAYMENT.Paytype ,PAYMENT.Total
                            FROM PAYMENT, ORDER_FOOD, USER_ACCOUNT
                            WHERE PAYMENT.OrderID = ORDER_FOOD.OrderID AND PAYMENT.CustomerID = USER_ACCOUNT.ID AND USER_ACCOUNT.UserName = '" + UserName + "' AND USER_ACCOUNT.Password = '" + Password + "';";

                DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

                return table.ConvertToList<Pay_Ord>();
            }
            return new List<Pay_Ord>();
        }

        [HttpGet("food")]
        public IEnumerable<foodsOrdered> GetFoodsOrderedOfOrder(string CustomerID, string OrderID, string UserName, string Password)
        {
            if (GetTypeOfAccount(UserName, Password) != "")
            {
                string query = $"SELECT FOOD.Name, FOOD.Price, ORDERED.Quantity, ORDERED.OrderNote FROM dbo.ORDERED, dbo.FOOD WHERE ORDERED.FoodID = FOOD.FoodID AND ORDERED.CustomerID = {CustomerID} AND ORDERED.OrderID = {OrderID};";

                DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

                return table.ConvertToList<foodsOrdered>();
            }
            return new List<foodsOrdered>();
        }

        [HttpGet("all")]
        public IEnumerable<Pay_Ord> GetAllOrders(string UserName, string Password)
        {
            string s = GetTypeOfAccount(UserName, Password);
            if (s == "Manager" || s == "Clerk")
            {
                string query = @"SELECT PAYMENT.CustomerID, PAYMENT.OrderID, USER_ACCOUNT.FName, USER_ACCOUNT.Address, USER_ACCOUNT.PhoneNumber, ORDER_FOOD.Available, ORDER_FOOD.Date,PAYMENT.Paytype ,PAYMENT.Total
                            FROM PAYMENT, ORDER_FOOD, USER_ACCOUNT
                            WHERE PAYMENT.OrderID = ORDER_FOOD.OrderID AND PAYMENT.CustomerID = USER_ACCOUNT.ID;";

                DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

                return table.ConvertToList<Pay_Ord>();
            }
            return new List<Pay_Ord>();
        }

        [HttpPut("confirm")]
        public string EditAllOrders(string Available, string OrderID, string UserName, string Password)
        {
            if (GetTypeOfAccount(UserName, Password) == "Clerk")
            {
                string query = @"UPDATE ORDER_FOOD SET Available = '" + Available + "' WHERE ORDER_FOOD.OrderID = '" + OrderID + "';";

                int n = SqlExecutes.Instance.ExecuteNonQuery(query);
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
                string query2 = $"INSERT INTO ORDER_FOOD VALUES ( '{allInfo.Date}', 'Waitting', 1);SELECT TOP 1 OrderID FROM ORDER_FOOD ORDER BY OrderID DESC; ";
                string OrderID = SqlExecutes.Instance.ExecuteQuery(query2).Rows[0]["OrderID"].ToString();
                string query = $"INSERT INTO PAYMENT VALUES ({allInfo.CustomerID}, {OrderID}, '{allInfo.Paytype}', '{allInfo.Total}');";
                SqlExecutes.Instance.ExecuteNonQuery(query);
                foreach (var item in allInfo.inforFoods)
                {
                    string query4 = $"INSERT INTO ORDERED VALUES ({allInfo.CustomerID}, {OrderID}, {item.FoodID}, {item.Quantity}, '{item.OrderNote}');";
                    SqlExecutes.Instance.ExecuteNonQuery(query4);
                }
                return "Success";
            }
            return "Fail";
        }
    }
}