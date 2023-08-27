package org.dndbase.config

import org.springframework.boot.convert.ApplicationConversionService
import org.springframework.context.annotation.Configuration
import org.springframework.format.FormatterRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class EnumMappingConfig : WebMvcConfigurer {

    override fun addFormatters(registry: FormatterRegistry) {
        ApplicationConversionService.configure(registry)
//        registry.addConverter(StringToMerchantsConverter())

    }


//    inner class StringToMerchantsConverter : Converter<String?, Array<Item.Merchant>> {
//
//        override fun convert(source: String): Array<Item.Merchant> {
//            return source.removeSurrounding("[", "]").splitToSequence(",").map { it.uppercase().trim() }.map { Item.Merchant.valueOf(it) }.toList().toTypedArray()
//        }
//
//    }

}