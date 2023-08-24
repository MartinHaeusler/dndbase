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
    fun canGetItemsWithQueryViaREST() {
        val paginatedResponse = getItemsViaREST(query = "Ring of Protection")
        expectThat(paginatedResponse){
            get { this.totalCount }.isEqualTo(1)
            get { this.pageContent }.single().and {
                get { this.name }.isEqualTo("Ring of Protection")
            }
        }
    }

    private fun getItemsViaREST(
        query: String? = null,
        pageIndex: Int? = null,
        pageSize: Int? = null,
        orderBy: ItemOrderBy? = null,
        orderDirection: OrderDirection? = null,
    ): PaginatedResponse<Item> {
        val urlQuery = if ((query ?: pageIndex ?: pageSize ?: orderBy ?: orderDirection) != null) {
            val argsList = listOfNotNull(
                query?.let { "query={query}" },
                pageIndex?.let { "pageIndex={pageIndex}" },
                pageSize?.let { "pageSize={pageSize}" },
                orderBy?.let { "orderBy={orderBy}" },
                orderDirection?.let { "orderDirection={orderDirection}" }
            )
            "?${argsList.joinToString(separator = "&")}"
        } else {
            ""
        }
        val urlArgs = listOfNotNull(query, pageIndex, pageSize, orderBy, orderDirection)
        val responseJson = mockMvc.get("/items${urlQuery}", *urlArgs.toTypedArray()).andExpect { status { isOk() } }.andReturn().response.contentAsString
        return objectMapper.readValue<PaginatedResponse<Item>>(responseJson)
    }

}