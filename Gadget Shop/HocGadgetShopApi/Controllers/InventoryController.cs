using System.Data.SqlClient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using HocGadgetShopApi.Model;
using System.Text.Json.Serialization;
using System.Net.Http.Json;
using Newtonsoft.Json;

namespace HocGadgetShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        [HttpPost]
        public ActionResult SavaInventoryData(InventoryRequestDto requestDto)
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=gadgetShop; Trusted_Connection=True;"
            };
            sqlConnection.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "Sp_SavaInventoryData";
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@ProductId", requestDto.ProductId);
            cmd.Parameters.AddWithValue("@ProductName", requestDto.ProductName);
            cmd.Parameters.AddWithValue("@AvailableQty", requestDto.AvailableQty);
            cmd.Parameters.AddWithValue("@ReoderPoint", requestDto.ReoderPoint);
            cmd.ExecuteNonQuery();


            cmd.Dispose();
            sqlConnection.Close();

            return Ok();
        }

        [HttpGet]

        public ActionResult<List<InventoryDto>> GetInventoryData()
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=gadgetShop; Trusted_Connection=True;"
            };
            sqlConnection.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "Sp_GetInventoryData";
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<InventoryDto> inventoryList = new List<InventoryDto>();
            foreach (DataRow row in dt.Rows)
            {
                InventoryDto inventoryDto = new InventoryDto
                {
                    ProductId = Convert.ToInt32(row["ProductId"]),
                    ProductName = row["ProductName"].ToString(),
                    AvailableQty = Convert.ToInt32(row["AvailableQty"]),
                    ReoderPoint = Convert.ToInt32(row["ReoderPoint"])
                };
                inventoryList.Add(inventoryDto);
            }
            cmd.Dispose();
            sqlConnection.Close();
            return Ok(inventoryList);
        }
        [HttpDelete]
        public ActionResult DeleteInventoryData(int ProductId)
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=gadgetShop; Trusted_Connection=True;"
            };
            sqlConnection.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "Sp_DeleteInventoryData";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@ProductId", ProductId);
            cmd.ExecuteNonQuery();


            cmd.Dispose();
            sqlConnection.Close();
            return Ok();
        }

        [HttpPut]
        public ActionResult UpdateInventoryData(InventoryRequestDto inventoryRequestDto)
        {
            SqlConnection sqlConnection = new SqlConnection
            {
                ConnectionString = "Server=DESKTOP-JBRE4TR; Database=gadgetShop; Trusted_Connection=True;"
            };
            sqlConnection.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConnection;
            cmd.CommandText = "Sp_UpdateInventoryData";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@ProductId", inventoryRequestDto.ProductId);
            cmd.Parameters.AddWithValue("@ProductName", inventoryRequestDto.ProductName);
            cmd.Parameters.AddWithValue("@AvailableQty", inventoryRequestDto.AvailableQty);
            cmd.Parameters.AddWithValue("@ReoderPoint", inventoryRequestDto.ReoderPoint);
            cmd.ExecuteNonQuery();


            cmd.Dispose();
            sqlConnection.Close();
            return Ok();
        }

    }   
}

