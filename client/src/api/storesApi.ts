import { Item, MerchantType } from "./itemsApi"
import { fetchGet } from "./server";
import { int } from "./typeAliases"

export type Offer = {
    item: Item,
    offeredPrice: int,
    offeredQuantity: int,
    isSpecialOffer: boolean,
}

export type OfferRequest = {
    storeName: string,
    storeType: MerchantType,
    minNumberOfItems: int,
    maxNumberOfItems: int,
    minNumberOfSpecialOffers: int,
    maxNumberOfSpecialOffers: int,
    priceModifier: int,
    specialOfferPriceModifier: int,
}


export async function getOffersForShop(
    query: OfferRequest
): Promise<Offer[]> {
    const realQuery = {
        ...query,
        priceModifier: query.priceModifier / 100.0,
        specialOfferPriceModifier: query.specialOfferPriceModifier / 100.0,
    }

    const response = await fetchGet("/store/inventory", realQuery);
    if (response.status < 200 || response.status >= 300) {
        throw new Error(
            `Expected fetch call to return an 'OK' status, but got: ${response.status}`
        );
    }
    const responseJson = await response.text();
    return JSON.parse(responseJson) as Offer[];
}