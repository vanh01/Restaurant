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
    public class Pay_Ord
    {
        public int CustomerID { get; set; }
        public int OrderID { get; set; }
        public string FName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Available { get; set; }
        public string Date { get; set; }
        public string Paytype { get; set; }
        public string Total { get; set; }

    }
    public class AllInfo
    {
        public int CustomerID { get; set; }
        public int OrderID { get; set; }
        public string FName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Date { get; set; }
        public string Paytype { get; set; }
        public string Total { get; set; }
        public List<Infor> InforOr { get; set; }

    }
    public class Infor
    {
        public int CustomerID { get; set; }
        public int FoodID { get; set; }
        public string Quantity { get; set; }
        public string Price { get; set; }
        public string OrderNote { get; set; }

    }
}