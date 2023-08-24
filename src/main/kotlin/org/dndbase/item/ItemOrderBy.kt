package org.dndbase.item

enum class ItemOrderBy {

    NAME,
    PRICE,
    WEIGHT,
    RARITY,
    TYPE,
    SUBTYPE,
    ATTUNEMENT,

    ;


    companion object {

        private val NAME_COMPARATOR = compareBy<Item> { it.name }
        private val PRICE_COMPARATOR = compareBy<Item> { it.price ?: 0.0 }.thenBy { it.name }
        private val WEIGHT_COMPARATOR = compareBy<Item> { it.weight ?: 0.0 }.thenBy { it.name }
        private val RARITY_COMPARATOR = compareBy<Item> { it.rarity }.thenBy { it.name }
        private val TYPE_COMPARATOR = compareBy<Item> { it.type }.thenBy { it.name }
        private val SUB_TYPE_COMPARATOR = compareBy<Item> { it.subtype ?: "" }.thenBy { it.name }
        private val ATTUNEMENT_COMPARATOR = compareBy<Item> { it.attunement }.thenBy { it.name }
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
                ATTUNEMENT -> ATTUNEMENT_COMPARATOR
            }
        }


}