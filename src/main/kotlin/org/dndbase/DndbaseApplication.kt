package org.dndbase

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DndbaseApplication

fun main(args: Array<String>) {
	runApplication<DndbaseApplication>(*args)
}
