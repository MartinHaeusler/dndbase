package org.dndbase.store

import org.dndbase.item.Item

class Offer(
    val item: Item,
    val regularOfferPrice: Int,
    val specialOfferPrice: Int,
    val offeredQuantity: Int,
    val isSpecialOffer: Boolean
)