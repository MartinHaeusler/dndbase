package org.dndbase.item

class GetItemsQuery(
    val orderBy: ItemOrderBy = ItemOrderBy.NAME,
    val orderDirection: OrderDirection = OrderDirection.DESCENDING,
    val pageSize: Int = Int.MAX_VALUE,
    val pageIndex: Int = 0,
    val filter: ItemFilter = ItemFilter(),
)

class ItemFilter(
    val nameContains: String? = null,
    val types: Set<Item.Type> = emptySet(),
    val merchants: Set<Item.Merchant> = emptySet(),
    val rarities: Set<Item.Rarity> = emptySet(),
    val costRange: ClosedFloatingPointRange<Double>? = null,
    val idNotWithin: Set<String> = emptySet(),
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
        if(item.id in idNotWithin){
            return false
        }
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