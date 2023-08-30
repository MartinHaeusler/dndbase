package org.dndbase.store

import org.dndbase.item.GetItemsQuery
import org.dndbase.item.Item
import org.dndbase.item.ItemFilter
import org.dndbase.item.ItemService
import org.springframework.stereotype.Service
import kotlin.random.Random

@Service
class StoreService(
    private val itemService: ItemService,
) {

    fun getStoreInventory(config: StoreConfig): List<Offer> {
        val allAvailableItems = itemService.getItemsForQuery(
            GetItemsQuery(
                filter = ItemFilter(merchants = setOf(config.merchantType), costRange = 0.0..9_999_999.0)
            )
        ).pageContent.toMutableList()

        val numberOfOffers = (config.minNumberOfItems..config.maxNumberOfItems).random()
        val numberOfSpecialOffers = (config.minNumberOfSpecialOffers..config.maxNumberOfSpecialOffers).random()

        val offers = mutableListOf<Offer>()
        repeat(numberOfOffers) {
            offers.addNotNull(buildOffer(config, allAvailableItems, false))
        }
        repeat(numberOfSpecialOffers){
            offers.addNotNull(buildOffer(config, allAvailableItems, true))
        }
        return offers
    }

    private fun buildOffer(config: StoreConfig, allAvailableItems: MutableList<Item>, isSpecialOffer: Boolean): Offer? {
        if (allAvailableItems.isEmpty()) {
            return null
        }
        val itemIndex = allAvailableItems.indices.random()
        val item = allAvailableItems[itemIndex]
        allAvailableItems.removeAt(itemIndex)
        val priceMod = if (isSpecialOffer) {
            config.specialOfferPriceModifier
        } else {
            config.priceModifier
        }
        return Offer(
            item = item,
            offeredPrice = (item.price!! * priceMod * Random.nextDouble(0.9, 1.10)).toInt(),
            offeredQuantity = if (item.type.isSingleUse) {
                Random.nextInt(1, 5)
            } else {
                1
            },
            isSpecialOffer = isSpecialOffer,
        )
    }

    private fun <T> MutableCollection<T>.addNotNull(element: T?): Boolean {
        return if (element == null) {
            false
        } else {
            this.add(element)
        }
    }
}