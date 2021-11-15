using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace RestaurantPOS2._0.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountOfClerkController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<AccountOfClerk> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 100).Select(index => new AccountOfClerk
            {
                UserName = rng.Next(0, index).ToString(),
                Password = rng.Next(1000000, 100000000).ToString(),
                Name = "Viet Anh" + index.ToString(),
                PhoneNumber = index.ToString()
            })
            .ToArray();
        }
    }
}
