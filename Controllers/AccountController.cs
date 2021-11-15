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
            string query = @"SELECT * FROM dbo.USER_ACCOUNT WHERE TypeOfUser = 'Clerk';";

            DataTable table = SqlExecutes.Instance.ExecuteQuery(query);

            return table.ConvertToList<Account>();
        }
    }
}
