package org.dndbase.item

class GetItemsQuery(
    val orderBy: ItemOrderBy,
    val orderDirection: OrderDirection,
    val pageSize: Int,
    val pageIndex: Int,
    val filter: ItemFilter,
)

class ItemFilter(
    val nameContains: String?,
    val types: Set<Item.Type>,
    val merchants: Set<Item.Merchant>,
    val rarities: Set<Item.Rarity>,
    val costRange: ClosedFloatingPointRange<Double>?,
) {

    val matchesAllItems: Boolean
        get() {
            return this.nameContains == null &&
                (this.types.isEmpty() || this.types.containsAll(Item.Type.entries)) &&
                (this.merchants.isEmpty() || this.merchants.containsAll(Item.Merchant.entries)) &&
                (this.rarities.isEmpty() || this.rarities.containsAll(Item.Rarity.entries)) &&
                this.costRange == null
        }

    fun matches(item: Item): Boolean {
        if (!nameContains.isNullOrBlank() && !item.name.contains(nameContains, ignoreCase = true)) {
            return false
        }
        if (types.isNotEmpty() && item.type !in types) {
            return false
        }
        if (merchants.isNotEmpty() && item.merchants.none { it in merchants }) {
            return false
        }
        if (rarities.isNotEmpty() && item.rarity !in rarities) {
            return false
        }
        if (costRange != null && (item.price == null || item.price !in costRange)) {
            return false
        }
        return true
    }

}