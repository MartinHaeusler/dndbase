package org.dndbase.item

import org.apache.commons.csv.CSVFormat
import org.apache.commons.csv.CSVParser

object ItemCsvParser {

    fun parse(csv: String, format: CSVFormat): List<Item> {
        return CSVParser.parse(csv, format).use { parser ->
            parser.map { entry -> createItemFromCSV(entry.toMap()) }
        }
    }

    private fun createItemFromCSV(data: Map<String, String?>): Item {
        val id = data["id"] ?: error("Found Item CSV entry without ID!")
        return Item(
            id = id,
            name = data["name"].takeIf { !it.isNullOrBlank() } ?: error("Found Item CSV entry without name (ID: '${id}')!"),
            type = Item.Type.parseOrNull(data["type"]) ?: error("Could not determine type of item (ID: '${id}')"),
            rarity = Item.Rarity.parseOrNull(data["rarity"]) ?: error("Could not determine rarity of item (ID: '${id}')"),
            attunement = parseBooleanOrNull(data["attunement"]) ?: error("Could not determine attunement of item (ID: '${id}')"),
            source = data["source"].handleNull(),
            extra = data["extra"].handleNull(),
            description = data["description"].handleNull(),
            price = data["price"]?.toDoubleOrNull(),
            subtype = data["subtype"].handleNull(),
            weight = data["weight"]?.toDoubleOrNull(),
            merchants = Item.Merchant.parseCsvList(data["merchants"].handleNull()),
        )

    }

    private fun parseBooleanOrNull(s: String?): Boolean? {
        return when (s?.lowercase()?.trim()) {
            "true" -> true
            "false" -> false
            else -> null
        }
    }

    private fun String?.handleNull(): String? {
        return when(this?.trim()?.lowercase()) {
            null, "null", "" -> null
            else -> this.trim()
        }
    }

}