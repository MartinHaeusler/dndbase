package org.dndbase.store

import org.dndbase.item.Item
import org.dndbase.ratelimit.RateLimited
import org.dndbase.ratelimit.RateLimiter
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController


@RestController
class StoreRestController(
    private val storeService: StoreService,
) {

    @RateLimited
    @ResponseBody
    @GetMapping("/api/store/inventory")
    fun getStoreInventory(
        @RequestParam("minNumberOfItems", defaultValue = "5") minNumberOfItems: Int,
        @RequestParam("maxNumberOfItems", defaultValue = "10") maxNumberOfItems: Int,
        @RequestParam("minNumberOfSpecialOffers", defaultValue = "1") minNumberOfSpecialOffers: Int,
        @RequestParam("maxNumberOfSpecialOffers", defaultValue = "3") maxNumberOfSpecialOffers: Int,
        @RequestParam("specialOfferPriceModifier", defaultValue = "0.85") specialOfferPriceModifier: Double,
        @RequestParam("priceModifier", defaultValue = "1.0") priceModifier: Double,
        @RequestParam("merchantType", defaultValue = "GENERAL") merchantType: Item.Merchant,
        @RequestParam("excludeItem", required = false) excludeItem: Set<String>?,
    ): List<Offer> {
        val config = StoreConfig(
            minNumberOfItems = minNumberOfItems,
            maxNumberOfItems = maxNumberOfItems,
            minNumberOfSpecialOffers = minNumberOfSpecialOffers,
            maxNumberOfSpecialOffers = maxNumberOfSpecialOffers,
            specialOfferPriceModifier = specialOfferPriceModifier,
            priceModifier = priceModifier,
            merchantType = merchantType,
            excludeItems = excludeItem ?: emptySet()
        )
        return storeService.getStoreInventory(config)
    }

}