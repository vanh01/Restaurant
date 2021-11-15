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

        public SqlExecutes()
        {
        }

        public DataTable ExecuteQuery(string query)
        {
            SqlConnection myCon = new SqlConnection(sqlDataSource);
            DataTable table = new DataTable();
            SqlDataReader myReader;
            myCon.Open();
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                myReader = myCommand.ExecuteReader();
                table.Load(myReader);

                myReader.Close();
                myCon.Close();
            }
            return table;
        }
    }
}