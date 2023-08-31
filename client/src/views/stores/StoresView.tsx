import ItemMerchantSelect from "views/items/ItemMerchantSelect";
import "./StoresView.css"
import { useForm, Controller } from "react-hook-form";
import { MerchantType } from "api/itemsApi";
import { int } from "api/typeAliases";
import { Button, Classes, Icon, Tag } from "@blueprintjs/core";
import { Offer, getOffersForShop } from "api/storesApi";
import { useState } from "react";
import ItemPriceDisplay from "views/items/PriceDisplay";
import ItemRarityDisplay from "views/items/ItemRarityDisplay";
import ItemTypeDisplay, { ItemTypeIcon } from "views/items/ItemTypeDisplay";
import ItemSourceDisplay from "views/items/ItemSourceDisplay";
import ItemAttunementDisplay from "views/items/ItemAttunementDisplay";
import ItemSubTypeDisplay from "views/items/ItemSubTypeDisplay";
import ItemExtraDisplay from "views/items/ItemExtraDisplay";

type FormProps = {
  storeName: string,
  storeType: MerchantType,
  minNumberOfItems: int,
  maxNumberOfItems: int,
  minNumberOfSpecialOffers: int,
  maxNumberOfSpecialOffers: int,
  priceModifier: int,
  specialOfferPriceModifier: int,
}

type InventoryListProps = {
  shopName: string,
  offers: Offer[],
}

function StoresView() {
  const [state, setState] = useState<InventoryListProps | undefined>(undefined)
  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<FormProps>();

  function onSubmit(formData: FormProps) {
    console.log("Submitting", formData)
    getOffersForShop(formData).then((offers) => {
      setState({
        shopName: formData.storeName,
        offers: offers
      })
    })
  }

  return <div className="storesView">
    {state ? <><InventoryList {...state} />
      <div className="buttonBar">
        <Button icon="circle-arrow-left" onClick={() => setState(undefined)}>Back</Button>
        <Button icon="print">Print</Button>
      </div>
    </> :
      <form className="storesForm" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Store Name:</span>
          <input type="text" placeholder="Store Name" required={true} {...register("storeName")} />
          {errors.storeName?.type === 'required' && <p className="validationError" role="alert">Please specify a store name</p>}
        </label>
        <label>
          <span>Store Type:</span>
          <Controller
            control={control}
            name="storeType"
            rules={{ required: true }}
            render={({ field }) => <ItemMerchantSelect className="select" value={field.value} onChange={field.onChange} />}
          />
          {errors.storeType?.type === 'required' && <p className="validationError" role="alert">Please select a store type</p>}
        </label>
        <label>
          <span>Number of Items (Min):</span>
          <input type="number" defaultValue={5} min={1} max={50} {...register("minNumberOfItems", { valueAsNumber: true })} />
        </label>
        <label>
          <span>Number of Items (Max):</span>
          <input type="number" defaultValue={10} min={1} max={50} {...register("maxNumberOfItems", { valueAsNumber: true })} />
        </label>
        <label>
          <span>Number of special offers (Min):</span>
          <input type="number" defaultValue={1} min={0} max={50} {...register("minNumberOfSpecialOffers", { valueAsNumber: true })} />
        </label>
        <label>
          <span>Number of special offers (Max):</span>
          <input type="number" defaultValue={3} min={0} max={50} {...register("maxNumberOfSpecialOffers", { valueAsNumber: true })} />
        </label>
        <label>
          <span>Price Modifier (in %):</span>
          <input type="number" min={1} max={1000} defaultValue={100} {...register("priceModifier", { valueAsNumber: true })} />
        </label>
        <label>
          <span>Special Offer Modifier (in %):</span>
          <input type="number" min={1} max={1000} defaultValue={80} {...register("specialOfferPriceModifier", { valueAsNumber: true })} />
        </label>
        <input type="submit" className="submitButton" value="Generate Inventory" />
      </form>}
  </div>;
}

function InventoryList(props: InventoryListProps) {
  return <>
    <h1 className="shopName">{props.shopName}</h1>
    <div className="inventoryList">
      {props.offers.map((offer) => <OfferDisplay {...offer} key={offer.item.id} />)}
    </div>
  </>
}

function OfferDisplay(props: Offer) {
  return <div className="offer">
    <div className="heading">
      <div>
        <ItemTypeIcon type={props.item.type} />
        &nbsp;
        <span className="itemName">{props.item.name}</span>
      </div>
      <div>
        <ItemPriceDisplay value={props.offeredPrice} />
      </div>
    </div>
    <div className="detailsRow">
      <div className="detailsStandardRow">
        <div className="detailsTagCloud">
          <Tag round={true}>
            <ItemRarityDisplay rarity={props.item.rarity} />
          </Tag>
          <Tag round={true}>
            Attunement: <ItemAttunementDisplay attunement={props.item.attunement} />
          </Tag>
          {props.offeredQuantity > 1 && <Tag round={true}>In Stock: {props.offeredQuantity}</Tag>}
        </div>
        {props.isSpecialOffer && <Tag round={true} intent="warning">Special Offer!</Tag>}
      </div>
      <div className="extraTagCloud">
        {props.item.subtype && <Tag round={true}><ItemSubTypeDisplay subType={props.item.subtype} /></Tag>}
        {props.item.extra && <Tag round={true}><ItemExtraDisplay extra={props.item.extra} /></Tag>}
        <Tag round={true}>
      <ItemSourceDisplay source={props.item.source} />
    </Tag>
      </div>
    </div>
    <div className="description">{props.item.description}</div>
  </div>
}

export default StoresView;
