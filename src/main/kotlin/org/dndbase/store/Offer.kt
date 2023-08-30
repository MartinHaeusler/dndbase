package org.dndbase.store

import org.dndbase.item.Item

class Offer(
    val item: Item,
    val offeredPrice: Int,
    val offeredQuantity: Int,
    val isSpecialOffer: Boolean
)