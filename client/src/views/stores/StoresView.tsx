import ItemMerchantSelect from "views/items/ItemMerchantSelect";

function StoresView() {
  return <div>
    <form>
      <label>
        Store Name:
        <input type="text" name="storeName" />
        Store Type:
        <ItemMerchantSelect value="GENERAL" onChange={(merchantType)=>{}}/>
        Number of Items (Min):
        <input type="number" name="minNumberOfItems" />
        Number of Items (Max):
        <input type="number" name="maxNumberOfItems" />
        Number of special offers (Min):
        <input type="number" name="minNumberOfSpecialOffers" />
        Number of special offers (Max):
        <input type="number" name="maxNumberOfSpecialOffers" />
        Price Modifier:
        <input type="number" name="priceModifier" min={0.01} max={10.0} defaultValue={1.0} />
        Special Offer Modifier:
        <input type="number" name="specialOfferPriceModifier" min={0.01} max={10.0} defaultValue={0.8} />
      </label>

    </form>

  </div>;
}

export default StoresView;
