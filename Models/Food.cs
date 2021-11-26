using System;
using Microsoft.AspNetCore.Http;

namespace RestaurantPOS2._0
{
    public class Food
    {
        public int FoodID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string PathImg { get; set; }
        public string Category { get; set; }
        public int Available { get; set; }
    }

    public class FoodFull
    {
        public int FoodID { get; set; }
        public IFormFile file { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Category { get; set; }
    }
}