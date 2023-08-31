import ItemMerchantSelect from "views/items/ItemMerchantSelect";
import "./StoresView.css"
import { useForm, Controller } from "react-hook-form";
import { MerchantType } from "api/itemsApi";
import { int } from "api/typeAliases";
import { Classes } from "@blueprintjs/core";

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

function StoresView() {
  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<FormProps>();

  return <div>
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
        <input type="number" defaultValue={5} min={1} max={50} {...register("minNumberOfItems")} />
      </label>
      <label>
        <span>Number of Items (Max):</span>
        <input type="number" defaultValue={10} min={1} max={50} {...register("maxNumberOfItems")} />
      </label>
      <label>
        <span>Number of special offers (Min):</span>
        <input type="number" defaultValue={1} min={0} max={50} {...register("minNumberOfSpecialOffers")} />
      </label>
      <label>
        <span>Number of special offers (Max):</span>
        <input type="number" defaultValue={3} min={0} max={50} {...register("maxNumberOfSpecialOffers")} />
      </label>
      <label>
        <span>Price Modifier (in %):</span>
        <input type="number" min={1} max={1000} defaultValue={100} {...register("priceModifier")} />
      </label>
      <label>
        <span>Special Offer Modifier (in %):</span>
        <input type="number" min={1} max={1000} defaultValue={80} {...register("specialOfferPriceModifier")} />
      </label>
      <input type="submit" />
    </form>

  </div>;
}

function onSubmit(data: FormProps) {
  console.log("Submitting", data)
}

export default StoresView;
