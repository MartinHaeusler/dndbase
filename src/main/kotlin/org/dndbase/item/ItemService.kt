package org.dndbase.item

import com.google.common.io.Resources
import mu.KotlinLogging
import org.apache.commons.csv.CSVFormat
import org.apache.commons.csv.CSVParser
import org.springframework.stereotype.Service

@Service
class ItemService() {

    companion object {

        val log = KotlinLogging.logger { }

        const val ITEMS_CSV_PATH = "static/dndbase-items.csv"
        val ITEMS_CSV_FORMAT: CSVFormat = CSVFormat.Builder.create().setHeader().setDelimiter(',').setTrim(true).setQuote('"').build()

    }

    private final val allItems: List<Item>

    init {
        log.info { "Loading Item List from CSV..." }
        val itemsCSV = Resources.getResource(ITEMS_CSV_PATH).readText()
        this.allItems = ItemCsvParser.parse(itemsCSV, ITEMS_CSV_FORMAT)
        log.info { "Item list loaded successfully." }
    }

    fun getItemsForQuery(
        query: String?,
        orderBy: ItemOrderBy,
        orderDirection: OrderDirection,
        pageSize: Int,
        pageIndex: Int,
    ): PaginatedResponse<Item> {
        val matchingItems = if (query.isNullOrBlank()) {
            allItems
        } else {
            allItems.filter { it.matchesQuery(query) }
        }
        val matchingItemsSorted = when (orderDirection) {
            OrderDirection.ASCENDING -> matchingItems.sortedWith(orderBy.comparator)
            OrderDirection.DESCENDING -> matchingItems.sortedWith(orderBy.comparator.reversed())
        }

        val pageContent = matchingItemsSorted.asSequence().drop(pageIndex * pageSize).take(pageSize).toList()
        return PaginatedResponse(
            totalCount = matchingItems.size,
            pageContent = pageContent
        )
    }

    private fun Item.matchesQuery(query: String): Boolean {
        return this.name.contains(query, ignoreCase = true) ||
            this.description?.contains(query, ignoreCase = true) ?: false ||
            this.extra?.contains(query, ignoreCase = true) ?: false ||
            this.type.toString().contains(query, ignoreCase = true) ||
            this.subtype?.contains(query, ignoreCase = true) ?: false ||
            this.rarity.toString().contains(query, ignoreCase = true) ||
            this.price.toString().contains(query, ignoreCase = true) ||
            this.source?.contains(query, ignoreCase = true) ?: false
    }
}

