package org.dndbase.item

import jakarta.validation.constraints.Min
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class ItemRestController(
    private val itemService: ItemService,
) {

    @GetMapping("/items")
    fun getAllItems(
        @RequestParam("orderBy", required = false, defaultValue = "name") orderBy: ItemOrderBy,
        @RequestParam("orderDirection", required = false, defaultValue = "ascending") orderDirection: OrderDirection,
        @RequestParam("pageSize", required = false, defaultValue = "${Int.MAX_VALUE}") @Min(1) pageSize: Int,
        @RequestParam("pageIndex", required = false, defaultValue = "0") @Min(0) pageIndex: Int,
        @RequestParam("query", required = false) query: String?
    ): PaginatedResponse<Item> {
        return this.itemService.getItemsForQuery(query, orderBy, orderDirection, pageSize, pageIndex)
    }


}