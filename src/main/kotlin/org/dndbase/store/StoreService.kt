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
                filter = ItemFilter(
                    merchants = setOf(config.merchantType),
                    costRange = 0.0..9_999_999.0,
                    idNotWithin = config.excludeItems,
                )
            )
        ).pageContent.toMutableList()

        val numberOfOffers = (config.minNumberOfItems..config.maxNumberOfItems).random()
        val numberOfSpecialOffers = (config.minNumberOfSpecialOffers..config.maxNumberOfSpecialOffers).random()

        val offers = mutableListOf<Offer>()
        repeat(numberOfOffers) {
            offers.addNotNull(buildOffer(config, allAvailableItems, false))
        }
        repeat(numberOfSpecialOffers) {
            offers.addNotNull(buildOffer(config, allAvailableItems, true))
        }
        // sort special offers to the front
        return offers.sortedWith(compareByDescending<Offer> { it.isSpecialOffer }.thenBy { it.item.name })
    }

    private fun buildOffer(config: StoreConfig, allAvailableItems: MutableList<Item>, isSpecialOffer: Boolean): Offer? {
        if (allAvailableItems.isEmpty()) {
            return null
        }
        val itemIndex = allAvailableItems.indices.random()
        val item = allAvailableItems[itemIndex]
        allAvailableItems.removeAt(itemIndex)
        return Offer(
            item = item,
            regularOfferPrice = computeOfferPrice(item.price, config.priceModifier),
            specialOfferPrice = computeOfferPrice(item.price, config.specialOfferPriceModifier),
            offeredQuantity = if (item.type.isSingleUse) {
                Random.nextInt(1, 5)
            } else {
                1
            },
            isSpecialOffer = isSpecialOffer,
        )
    }

    private fun computeOfferPrice(basePrice: Double?, modifier: Double, variance: Double = 0.1): Int {
        return (basePrice!! * modifier * Random.nextDouble(1.0 - variance, 1.0 + variance)).toInt()
    }

    private fun <T> MutableCollection<T>.addNotNull(element: T?): Boolean {
        return if (element == null) {
            false
        } else {
            this.add(element)
        }
    }
}