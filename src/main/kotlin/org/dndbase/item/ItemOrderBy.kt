package org.dndbase.item

enum class ItemOrderBy {

    NAME,
    PRICE,
    WEIGHT,
    RARITY,
    TYPE,
    SUBTYPE,

    ;


    companion object {

        private val NAME_COMPARATOR = compareBy<Item> { it.name }
        private val PRICE_COMPARATOR = compareBy<Item> { it.price ?: 0.0 }
        private val WEIGHT_COMPARATOR = compareBy<Item> { it.weight ?: 0.0 }
        private val RARITY_COMPARATOR = compareBy<Item> { it.rarity }
        private val TYPE_COMPARATOR = compareBy<Item> { it.type }
        private val SUB_TYPE_COMPARATOR = compareBy<Item> { it.subtype ?: "" }

    }

    val comparator: Comparator<Item>
        get() {
            return when (this) {
                NAME -> NAME_COMPARATOR
                PRICE -> PRICE_COMPARATOR
                WEIGHT -> WEIGHT_COMPARATOR
                RARITY -> RARITY_COMPARATOR
                TYPE -> TYPE_COMPARATOR
                SUBTYPE -> SUB_TYPE_COMPARATOR
            }
        }


}