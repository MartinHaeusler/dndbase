package org.dndbase.item

class Item(
    val id: String,
    val name: String,
    val type: Type,
    val rarity: Rarity,
    val attunement: Boolean,
    val source: String?,
    val extra: String?,
    val description: String?,
    val price: Double?,
    val subtype: String?,
    val weight: Double?,
    val merchants: List<Merchant>,
) {

    enum class Type {
        ARMOR,
        POTION,
        RING,
        ROD,
        SCROLL,
        STAFF,
        WAND,
        WEAPON,
        WONDROUS_ITEM,

        ;

        companion object {

            fun parseOrNull(s: String?): Type? {
                return when (s?.lowercase()?.trim()) {
                    "armor" -> ARMOR
                    "potion" -> POTION
                    "ring" -> RING
                    "rod" -> ROD
                    "scroll" -> SCROLL
                    "staff" -> STAFF
                    "wand" -> WAND
                    "weapon" -> WEAPON
                    "wondrous item" -> WONDROUS_ITEM
                    else -> null
                }
            }
        }

        val isSingleUse: Boolean
            get(){
                return when(this){
                    POTION, SCROLL -> true
                    else -> false
                }
            }
    }

    enum class Rarity {
        COMMON,
        UNCOMMON,
        RARE,
        VERY_RARE,
        LEGENDARY,
        ARTIFACT,

        ;

        companion object {
            fun parseOrNull(s: String?): Rarity? {
                return when (s?.lowercase()?.trim()) {
                    "common" -> COMMON
                    "uncommon" -> UNCOMMON
                    "rare" -> RARE
                    "very_rare", "very rare" -> VERY_RARE
                    "legendary" -> LEGENDARY
                    "artifact" -> ARTIFACT
                    else -> null
                }
            }
        }

    }

    enum class Merchant {

        SMITH,
        TEMPLE,
        WEAPONSMITH,
        ARMORER,
        ALCHEMIST,
        HEALER,
        WIZARD,
        LIBRARIAN,
        JEWELLER,
        GENERAL,
        CONCEALER,
        BARD,

        ;

        companion object {

            fun parseCsvList(string: String?): List<Merchant> {
                if (string == null) {
                    return emptyList()
                }
                return string.split(',').asSequence().map { it.trim() }.map(::parse).toList()
            }

            fun parse(string: String?): Merchant {
                return when (string?.lowercase()?.trim()) {
                    "smith" -> SMITH
                    "temple" -> TEMPLE
                    "weaponsmith" -> WEAPONSMITH
                    "armorer" -> ARMORER
                    "alchemist" -> ALCHEMIST
                    "healer"-> HEALER
                    "wizard" -> WIZARD
                    "librarian" -> LIBRARIAN
                    "jeweller" -> JEWELLER
                    "general" -> GENERAL
                    "concealer" -> CONCEALER
                    "bard" -> BARD
                    else -> error("Could not parse Merchant from input '${string}'!")
                }
            }

        }

    }

}

