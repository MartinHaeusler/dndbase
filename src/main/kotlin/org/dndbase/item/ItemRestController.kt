package org.dndbase.item

import jakarta.validation.constraints.Min
import org.dndbase.ratelimit.RateLimited
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import kotlin.math.max
import kotlin.math.min

@RestController
class ItemRestController(
    private val itemService: ItemService,
) {

    @RateLimited
    @GetMapping("/items")
    fun getAllItems(
        @RequestParam("orderBy", required = false, defaultValue = "name") orderBy: ItemOrderBy,
        @RequestParam("orderDirection", required = false, defaultValue = "ascending") orderDirection: OrderDirection,
        @RequestParam("pageSize", required = false, defaultValue = "${Int.MAX_VALUE}") @Min(1) pageSize: Int,
        @RequestParam("pageIndex", required = false, defaultValue = "0") @Min(0) pageIndex: Int,
        @RequestParam("nameContains", required = false) queryNameContains: String?,
        @RequestParam("merchants", required = false) queryMerchants: List<Item.Merchant>?,
        @RequestParam("rarities", required = false) queryRarities: List<Item.Rarity>?,
        @RequestParam("types", required = false) queryTypes: List<Item.Type>?,
        @RequestParam("costMin", required = false) @Min(0) queryCostMin: Double?,
        @RequestParam("costMax", required = false) @Min(0) queryCostMax: Double?,
    ): PaginatedResponse<Item> {
        val query = GetItemsQuery(
            orderBy = orderBy,
            orderDirection = orderDirection,
            pageSize = pageSize,
            pageIndex = pageIndex,
            filter = ItemFilter(
                nameContains = queryNameContains,
                types = queryTypes?.toSet() ?: emptySet(),
                merchants = queryMerchants?.toSet() ?: emptySet(),
                rarities = queryRarities?.toSet() ?: emptySet(),
                costRange = createRangeFromMinAndMax(queryCostMin, queryCostMax)
            )
        )
        return this.itemService.getItemsForQuery(query)
    }


    private fun createRangeFromMinAndMax(min: Double?, max: Double?): ClosedFloatingPointRange<Double>? {
        return if (min != null) {
            if (max != null) {
                val realMin = min(min, max)
                val realMax = max(min, max)
                realMin..realMax
            } else {
                min..Double.MAX_VALUE
            }
        } else {
            if (max != null) {
                0.0..max
            } else {
                null
            }
        }
    }

}