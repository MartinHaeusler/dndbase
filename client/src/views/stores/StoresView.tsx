import { Button, Tag } from '@blueprintjs/core';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetItemsQuery, MerchantType } from 'api/itemsApi';
import { Offer, OfferRequest, getOffersForShop } from 'api/storesApi';
import { int } from 'api/typeAliases';
import classNames from 'classnames';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ItemAttunementDisplay from 'views/items/ItemAttunementDisplay';
import ItemExtraDisplay from 'views/items/ItemExtraDisplay';
import ItemMerchantSelect from 'views/items/ItemMerchantSelect';
import ItemRarityDisplay from 'views/items/ItemRarityDisplay';
import ItemSourceDisplay from 'views/items/ItemSourceDisplay';
import ItemSubTypeDisplay from 'views/items/ItemSubTypeDisplay';
import { ItemTypeIcon } from 'views/items/ItemTypeDisplay';
import ItemPriceDisplay from 'views/items/PriceDisplay';
import './StoresView.css';

type FormProps = {
  storeName: string;
  storeType: MerchantType;
  minNumberOfItems: int;
  maxNumberOfItems: int;
  minNumberOfSpecialOffers: int;
  maxNumberOfSpecialOffers: int;
  priceModifier: int;
  specialOfferPriceModifier: int;
  excludeItem: string[];
};

function StoresView() {
  const [state, setState] = useState<InventoryListProps | undefined>(undefined);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<FormProps>();

  function onSubmit(formData: FormProps) {
    console.log('Submitting', formData);
    getOffersForShop(formData).then((offers) => {
      setState({
        shopName: formData.storeName,
        query: formData,
        offers: offers,
      });
    });
  }

  function reroll(itemIndex: int) {
    getOffersForShop({
      storeName: state?.shopName ?? '',
      maxNumberOfItems: 1,
      minNumberOfItems: 1,
      maxNumberOfSpecialOffers: 0,
      minNumberOfSpecialOffers: 0,
      priceModifier: state?.query.priceModifier ?? 1.0,
      specialOfferPriceModifier: state?.query.specialOfferPriceModifier ?? 0.8,
      storeType: state?.query.storeType ?? 'GENERAL',
      excludeItem: state?.offers?.map((offer) => offer.item.id) ?? [],
    }).then((fetchedOffers) => {
      const oldOffers = state?.offers ?? [];
      if (!state || oldOffers.length < itemIndex + 1 || fetchedOffers.length <= 0) {
        return;
      }
      const newOffers = [...oldOffers];
      newOffers[itemIndex] = { ...fetchedOffers[0], isSpecialOffer: oldOffers[itemIndex].isSpecialOffer };
      setState({ ...state, offers: newOffers });
    });
  }

  return (
    <div className="storesView">
      {state ? (
        <>
          <InventoryList
            {...state}
            onChange={(newProps) => setState(newProps)}
            onReroll={(offer, index) => reroll(index)}
          />
          <div className={classNames('buttonBar', 'noPrint')}>
            <Button icon="circle-arrow-left" onClick={() => setState(undefined)}>
              Back
            </Button>
            <Button icon="print">Print</Button>
          </div>
        </>
      ) : (
        <form className="storesForm" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Store Name:</span>
            <input type="text" placeholder="Store Name" required={true} {...register('storeName')} />
            {errors.storeName?.type === 'required' && (
              <p className="validationError" role="alert">
                Please specify a store name
              </p>
            )}
          </label>
          <label>
            <span>Store Type:</span>
            <Controller
              control={control}
              name="storeType"
              rules={{ required: true }}
              render={({ field }) => (
                <ItemMerchantSelect className="select" value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.storeType?.type === 'required' && (
              <p className="validationError" role="alert">
                Please select a store type
              </p>
            )}
          </label>
          <label>
            <span>Number of Items (Min):</span>
            <input
              type="number"
              defaultValue={5}
              min={1}
              max={50}
              {...register('minNumberOfItems', { valueAsNumber: true })}
            />
          </label>
          <label>
            <span>Number of Items (Max):</span>
            <input
              type="number"
              defaultValue={10}
              min={1}
              max={50}
              {...register('maxNumberOfItems', { valueAsNumber: true })}
            />
          </label>
          <label>
            <span>Number of special offers (Min):</span>
            <input
              type="number"
              defaultValue={1}
              min={0}
              max={50}
              {...register('minNumberOfSpecialOffers', { valueAsNumber: true })}
            />
          </label>
          <label>
            <span>Number of special offers (Max):</span>
            <input
              type="number"
              defaultValue={3}
              min={0}
              max={50}
              {...register('maxNumberOfSpecialOffers', { valueAsNumber: true })}
            />
          </label>
          <label>
            <span>Price Modifier (in %):</span>
            <input
              type="number"
              min={1}
              max={1000}
              defaultValue={100}
              {...register('priceModifier', { valueAsNumber: true })}
            />
          </label>
          <label>
            <span>Special Offer Modifier (in %):</span>
            <input
              type="number"
              min={1}
              max={1000}
              defaultValue={80}
              {...register('specialOfferPriceModifier', { valueAsNumber: true })}
            />
          </label>
          <input type="submit" className="submitButton" value="Generate Inventory" />
        </form>
      )}
    </div>
  );
}

type InventoryListProps = {
  shopName: string;
  offers: Offer[];
  query: OfferRequest;
  onChange?: (newProps: InventoryListProps) => void;
  onReroll?: (offer: Offer, offerIndex: int) => void;
};

function InventoryList(props: InventoryListProps) {
  return (
    <>
      <h1 className="shopName">{props.shopName}</h1>
      <div className="inventoryList">
        {props.offers.map((offer, index) => (
          <OfferDisplay
            offer={offer}
            key={offer.item.id}
            onChange={(newOffer) => {
              if (!props.onChange) {
                return;
              }
              const newOffers = [...props.offers];
              newOffers[index] = newOffer;
              const newProps = { ...props, offers: newOffers };
              props.onChange(newProps);
            }}
            onReroll={() => {
              props.onReroll && props.onReroll(offer, index);
            }}
          />
        ))}
      </div>
    </>
  );
}

type OfferProps = {
  offer: Offer;
  onChange?: (offer: Offer) => void;
  onReroll?: (offer: Offer) => void;
};

function OfferDisplay(props: OfferProps) {
  return (
    <div className="offer">
      <div className="heading">
        <div>
          <ItemTypeIcon type={props.offer.item.type} />
          &nbsp;
          <span className="itemName">{props.offer.item.name}</span>
        </div>
        <div>
          <ItemPriceDisplay
            value={props.offer.isSpecialOffer ? props.offer.specialOfferPrice : props.offer.regularOfferPrice}
          />
        </div>
      </div>
      <div className="detailsRow">
        <div className="detailsStandardRow">
          <div className="detailsTagCloud">
            <Tag round={true}>
              <ItemRarityDisplay rarity={props.offer.item.rarity} />
            </Tag>
            <Tag round={true}>
              Attunement: <ItemAttunementDisplay attunement={props.offer.item.attunement} />
            </Tag>
            {props.offer.offeredQuantity > 1 && <Tag round={true}>In Stock: {props.offer.offeredQuantity}</Tag>}
          </div>
          <OfferTypeToggle
            isSpecialOffer={props.offer.isSpecialOffer}
            onChange={(isSpecialOffer) => {
              if (!props.onChange) {
                return;
              }
              props.onChange({ ...props.offer, isSpecialOffer });
            }}
          />
        </div>
        <div className="extraTagCloud">
          {props.offer.item.subtype && (
            <Tag round={true}>
              <ItemSubTypeDisplay subType={props.offer.item.subtype} />
            </Tag>
          )}
          {props.offer.item.extra && (
            <Tag round={true}>
              <ItemExtraDisplay extra={props.offer.item.extra} />
            </Tag>
          )}
          <Tag round={true}>
            <ItemSourceDisplay source={props.offer.item.source} />
          </Tag>
        </div>
        <div className={classNames('actionButtons', 'noPrint')}>
          <Button
            icon={<FontAwesomeIcon icon={faDice} />}
            onClick={() => props.onReroll && props.onReroll(props.offer)}
          >
            Reroll
          </Button>
        </div>
      </div>
      <div className="description">{props.offer.item.description}</div>
    </div>
  );
}

type OfferTypeToggleProps = {
  isSpecialOffer: boolean;
  onChange?: (isSpecialOffer: boolean) => void;
};

function OfferTypeToggle(props: OfferTypeToggleProps) {
  return (
    <Tag
      round={true}
      className={classNames(
        'specialOfferToggle',
        { disableSpecialOffer: props.isSpecialOffer },
        { noPrint: !props.isSpecialOffer },
        { enableSpecialOffer: !props.isSpecialOffer },
      )}
      intent={props.isSpecialOffer ? 'warning' : 'none'}
      onClick={() => {
        props.onChange && props.onChange(!props.isSpecialOffer);
      }}
    >
      {props.isSpecialOffer ? 'Special Offer!' : 'Regular Offer'}
    </Tag>
  );
}

export default StoresView;
