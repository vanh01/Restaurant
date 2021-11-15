using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace RestaurantPOS2._0.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Account> Get()
        {
            string query = @"SELECT * FROM dbo.USER_ACCOUNT;";
            
            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

            List<Account> accountOfClerks = new List<Account>();
            accountOfClerks = (from DataRow dr in table.Rows
                               select new Account()
                               {
                                   ID = dr["ID"].ToString(),
                                   UserName = dr["UserName"].ToString(),
                                   Password = dr["Password"].ToString(),
                                   Fname = dr["FName"].ToString(),
                                   LName = dr["LName"].ToString(),
                                   BirthOfDate = dr["BirthOfDate"].ToString(),
                                   Address = dr["Address"].ToString(),
                                   PhoneNumber = dr["PhoneNumber"].ToString(),
                                   Img = dr["Img"].ToString(),
                                   TypeOfUser = dr["TypeOfUser"].ToString()
                               }).ToList();

            return accountOfClerks;
        }
    }
}
