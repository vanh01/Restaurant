using System.Reflection;
using System.Collections.Generic;
using System;
using System.Data.SqlClient;
using System.Data;

namespace RestaurantPOS2._0
{
    public class SqlExecutes
    {
        private string sqlDataSource = "Data Source=.;Initial Catalog=SE; Integrated Security=true";
        static private SqlExecutes instance;
        static public SqlExecutes Instance
        {
            get { if (instance == null) instance = new SqlExecutes(); return instance; }
            private set { }
        }

        public SqlExecutes() { }

        public DataTable ExecuteQuery(string query)
        {
            DataTable table = new DataTable();
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                SqlDataReader myReader;
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return table;
        }

        public int ExecuteNonQuery(string query)
        {
            int numberOfRows = 0;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    numberOfRows = myCommand.ExecuteNonQuery();
                    myCon.Close();
                }
            }
            return numberOfRows;
        }
    }


    public static class TableExtensions
    {
        public static List<T> ConvertToList<T>(this DataTable dataTable)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dataTable.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
    }


}