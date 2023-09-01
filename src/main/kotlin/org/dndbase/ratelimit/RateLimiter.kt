package org.dndbase.ratelimit

import com.google.common.cache.CacheBuilder
import com.google.common.cache.CacheLoader
import com.google.common.cache.LoadingCache
import io.github.bucket4j.Bandwidth
import io.github.bucket4j.Bucket
import io.github.bucket4j.Refill
import java.time.Duration

object RateLimiter {

    private val addressToBucket: LoadingCache<String, Bucket> = CacheBuilder.newBuilder()
        .weakKeys()
        .maximumSize(1000)
        .expireAfterAccess(Duration.ofMinutes(10))
        .build(CacheLoader.from(::createBucket))


    fun tryConsume(requestOrigin: String, tokens: Long = 1): Boolean {
        return addressToBucket[requestOrigin].tryConsume(tokens)
    }

    private fun createBucket(): Bucket {
        val limit = Bandwidth.classic(100, Refill.greedy(100, Duration.ofMinutes(1)))
        return Bucket.builder()
            .addLimit(limit)
            .build()
    }

}