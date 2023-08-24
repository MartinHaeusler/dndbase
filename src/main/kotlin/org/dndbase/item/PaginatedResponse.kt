package org.dndbase.item

class PaginatedResponse<T>(
    val totalCount: Int,
    val pageContent: List<T>,
)