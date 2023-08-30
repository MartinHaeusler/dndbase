package org.dndbase.store

import org.dndbase.item.Item

class StoreConfig(
    val minNumberOfItems: Int,
    val maxNumberOfItems: Int,
    val minNumberOfSpecialOffers: Int,
    val maxNumberOfSpecialOffers: Int,
    val specialOfferPriceModifier: Double,
    val priceModifier: Double,
    val merchantType: Item.Merchant,
) {

    init {
        require(minNumberOfItems > 0) {
            "Argument 'minNumberOfItems' must be greater than 0 (got: ${minNumberOfItems})!"
        }
        require(maxNumberOfItems > 0) {
            "Argument 'maxNumberOfItems' must be greater than 0 (got: ${maxNumberOfItems})!"
        }
        require(minNumberOfItems <= maxNumberOfItems) {
            "Argument 'minNumberOfItems' (${minNumberOfItems}) must be" +
                " less than or equal to argument 'maxNumberOfItems' (${maxNumberOfItems})!"
        }
        require(minNumberOfSpecialOffers >= 0) {
            "Argument 'minNumberOfSpecialOffers' must not be negative (got: ${minNumberOfSpecialOffers})!"
        }
        require(maxNumberOfSpecialOffers >= 0) {
            "Argument 'maxNumberOfSpecialOffers' must not be negative (got: ${maxNumberOfSpecialOffers})!"
        }
        require(minNumberOfSpecialOffers <= maxNumberOfSpecialOffers) {
            "Argument 'minNumberOfSpecialOffers' (${minNumberOfSpecialOffers}) must" +
                " be less than or equal to argument" +
                " 'maxNumberOfSpecialOffers' (${maxNumberOfSpecialOffers})!"
        }
        require(specialOfferPriceModifier in 0.01..10.0) {
            "Argument 'specialOfferPriceModifier' must be in range 0.01..10.0 (got ${specialOfferPriceModifier})!"
        }
        require(priceModifier in 0.01..10.0) {
            "Argument 'priceModifier' must be in range 0.01..10.0 (got ${priceModifier})!"
        }
        require(specialOfferPriceModifier <= priceModifier) {
            "Argument 'specialOfferPriceModifier' (${specialOfferPriceModifier}) must be" +
                " less than or equal to argument 'priceModifier' (${priceModifier})!"
        }
    }
}