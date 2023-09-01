package org.dndbase.item

import com.google.common.io.Resources
import mu.KotlinLogging
import org.apache.commons.csv.CSVFormat
import org.springframework.stereotype.Service

@Service
class ItemService {

    companion object {

        val log = KotlinLogging.logger { }

        const val ITEMS_CSV_PATH = "private/dndbase-items.csv"
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
        query: GetItemsQuery,
    ): PaginatedResponse<Item> {
        val matchingItems = if (query.filter.matchesAllItems) {
            allItems
        } else {
            allItems.filter(query.filter::matches)
        }
        val matchingItemsSorted = when (query.orderDirection) {
            OrderDirection.ASCENDING -> matchingItems.sortedWith(query.orderBy.comparator)
            OrderDirection.DESCENDING -> matchingItems.sortedWith(query.orderBy.comparator.reversed())
        }

        val pageContent = matchingItemsSorted.asSequence()
            .drop(query.pageIndex * query.pageSize)
            .take(query.pageSize)
            .toList()
        return PaginatedResponse(
            totalCount = matchingItems.size,
            pageContent = pageContent
        )
    }

}

