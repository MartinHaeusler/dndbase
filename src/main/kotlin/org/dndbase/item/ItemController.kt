package org.dndbase.item

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class ItemController(
    private val itemService: ItemService,
) {

    @GetMapping("/items")
    fun listItems(model: Model): String {
        model.addAttribute("items", itemService.allItems)
        return "items/item-list"
    }

}