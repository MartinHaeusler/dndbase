package org.dndbase.ratelimit

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.method.HandlerMethod
import org.springframework.web.servlet.HandlerInterceptor
import java.net.InetAddress


@Component
class RateLimitInterceptor: HandlerInterceptor {

    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        if (handler !is HandlerMethod) {
            return true
        }

        if(!handler.hasMethodAnnotation(RateLimited::class.java)){
            return true
        }

        val rateLimitOk = RateLimiter.tryConsume(request.remoteAddr, 1)
        if(!rateLimitOk){
            response.status = HttpStatus.TOO_MANY_REQUESTS.value()
            return false
        }

        return true
    }

}