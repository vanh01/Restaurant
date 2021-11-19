using System;

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
        public int Amount { get; set; }
        public double Rating { get; set; }
    }
}