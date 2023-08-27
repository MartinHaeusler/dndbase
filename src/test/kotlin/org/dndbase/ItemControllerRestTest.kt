package org.dndbase

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.dndbase.item.Item
import org.dndbase.item.ItemOrderBy
import org.dndbase.item.OrderDirection
import org.dndbase.item.PaginatedResponse
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import strikt.api.expectThat
import strikt.assertions.*


@SpringBootTest
@AutoConfigureMockMvc
class ItemControllerRestTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @Test
    fun canGetItemsViaREST() {
        val paginatedResponse = getItemsViaREST()
        expectThat(paginatedResponse) {
            get { this.totalCount }.isGreaterThan(0)
            get { this.totalCount }.isEqualTo(paginatedResponse.pageContent.size)
            get { this.pageContent }.isNotEmpty().isSorted(ItemOrderBy.NAME.comparator)
        }
    }

    @Test
    fun canGetItemsByMerchants() {
        val paginatedResponse = getItemsViaREST(merchants = setOf(Item.Merchant.WEAPONSMITH, Item.Merchant.BARD))
        expectThat(paginatedResponse) {
            get { this.totalCount }.isGreaterThan(0)
            get { this.pageContent }.isNotEmpty().and {
                any {
                    get { merchants }.contains(Item.Merchant.WEAPONSMITH)
                    get { merchants }.doesNotContain(Item.Merchant.BARD)
                }
                any {
                    get { merchants }.contains(Item.Merchant.BARD)
                    get { merchants }.doesNotContain(Item.Merchant.WEAPONSMITH)
                }
            }
        }
    }

    @Test
    fun canGetItemsWithQueryViaREST() {
        val paginatedResponse = getItemsViaREST(nameContains = "Ring of Protection")
        expectThat(paginatedResponse) {
            get { this.totalCount }.isEqualTo(1)
            get { this.pageContent }.single().and {
                get { this.name }.isEqualTo("Ring of Protection")
            }
        }
    }

    @Test
    fun canGetAllWeaponsViaREST() {
        val paginatedResponse = getItemsViaREST(types = setOf(Item.Type.WEAPON))
        expectThat(paginatedResponse) {
            get { this.totalCount }.isGreaterThan(0)
            get { this.pageContent }.isNotEmpty().and {
                all { get { type }.isEqualTo(Item.Type.WEAPON) }
            }
        }
    }

    private fun getItemsViaREST(
        nameContains: String? = null,
        merchants: Set<Item.Merchant> = emptySet(),
        rarities: Set<Item.Rarity> = emptySet(),
        types: Set<Item.Type> = emptySet(),
        costMin: Double? = null,
        costMax: Double? = null,
        pageIndex: Int? = null,
        pageSize: Int? = null,
        orderBy: ItemOrderBy? = null,
        orderDirection: OrderDirection? = null,
    ): PaginatedResponse<Item> {
        val argsList = listOfNotNull(
            nameContains?.let { "nameContains={nameContains}" },
            merchants.takeIf { it.isNotEmpty() }?.let { "merchants={merchants}" },
            rarities.takeIf { it.isNotEmpty() }?.let { "rarities={rarities}" },
            types.takeIf { it.isNotEmpty() }?.let { "types={types}" },
            costMin?.let { "costMin={costMin}" },
            costMax?.let { "costMax={costMax}" },
            pageIndex?.let { "pageIndex={pageIndex}" },
            pageSize?.let { "pageSize={pageSize}" },
            orderBy?.let { "orderBy={orderBy}" },
            orderDirection?.let { "orderDirection={orderDirection}" }
        ).filter { it.isNotBlank() }

        val urlQuery =
            if (argsList.isNotEmpty()) {
                "?${argsList.joinToString(separator = "&")}"
            } else {
                ""
            }
        val urlArgs = listOfNotNull(
            nameContains,
            merchants.takeIf { it.isNotEmpty() },
            rarities.takeIf { it.isNotEmpty() },
            types.takeIf { it.isNotEmpty() },
            costMin,
            costMax,
            pageIndex,
            pageSize,
            orderBy,
            orderDirection
        )
        val fullURL = "/items${urlQuery}"
        val responseJson = mockMvc.get(fullURL, *urlArgs.toTypedArray()).andExpect { status { isOk() } }.andReturn().response.contentAsString
        return objectMapper.readValue<PaginatedResponse<Item>>(responseJson)
    }

}