using System.Reflection;
using System.Collections.Generic;
using System;
using System.Data.SqlClient;
using System.Data;
using System.Threading.Tasks;

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

        public async Task<DataTable> ExecuteQuery(string query)
        {
            DataTable table = new DataTable();
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                SqlDataReader myReader;
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = await myCommand.ExecuteReaderAsync();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return table;
        }

        public async Task<int> ExecuteNonQuery(string query)
        {
            int numberOfRows = 0;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    numberOfRows = await myCommand.ExecuteNonQueryAsync();
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

            foreach (PropertyInfo pro in temp.GetProperties())
            {
                pro.SetValue(obj, dr[pro.Name], null);
            }
            return obj;
        }
    }


}