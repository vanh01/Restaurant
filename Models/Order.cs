using System;
using System.Collections.Generic;
namespace RestaurantPOS2._0
{
    public class foodsOrdered
    {
        public string Name { get; set; }
        public string Price { get; set; }
        public int Quantity { get; set; }
        public string OrderNote { get; set; }
    }
    public class Ordered
    {
        public int CustomerID { get; set; }
        public int OrderID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Status { get; set; }
        public string Date { get; set; }
        public string Paytype { get; set; }
        public string Total { get; set; }

    }
    public class AllInfo
    {
        public int CustomerID { get; set; }
        public string Date { get; set; }
        public string Paytype { get; set; }
        public string Total { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public List<InforFood> inforFoods { get; set; }

    }
    public class InforFood
    {
        public int FoodID { get; set; }
        public int Quantity { get; set; }
        public string OrderNote { get; set; }

    }
}