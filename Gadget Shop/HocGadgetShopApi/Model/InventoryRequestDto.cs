namespace HocGadgetShopApi.Model
{
    public class InventoryRequestDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int AvailableQty { get; set; }
        public int ReoderPoint { get; set; }

    }
}
