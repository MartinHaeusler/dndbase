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
        val ITEMS_CSV_FORMAT = CSVFormat.Builder.create().setHeader().setDelimiter(',').setTrim(true).setQuote('"').build()

    }

    final val allItems: List<Item>

    init {
        log.info { "Loading Item List from CSV..." }
        val itemsCSV = Resources.getResource(ITEMS_CSV_PATH).readText()
        this.allItems = ItemCsvParser.parse(itemsCSV, ITEMS_CSV_FORMAT)
        log.info { "Item list loaded successfully." }
    }


}