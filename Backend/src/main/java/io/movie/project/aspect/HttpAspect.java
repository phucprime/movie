package io.movie.project.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class HttpAspect {

    public static final Logger logger = LoggerFactory.getLogger(HttpAspect.class);

    @Pointcut("execution(* io.movie.project.controller.*.*(..))")
    public void log() { }

    @Before("log()")
    public void doBefore(JoinPoint joinPoint) {
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

       
        logger.info("url={}", request.getRequestURI());

        // method
        logger.info("method={}", request.getMethod());

       
        logger.info("ip={}", request.getRemoteAddr());


        logger.info("class_method={}", joinPoint.getSignature().getDeclaringTypeName() + "."
                + joinPoint.getSignature().getName());


        logger.info("args={}", joinPoint.getArgs());
    }

    @After("log()")
    public void doAfter(JoinPoint joinPoint) {
        logger.info("After: " + joinPoint.getSignature().getName());
    }

    @AfterReturning(returning = "object", pointcut = "log()")
    public void doAfterReturning(Object object) {
        logger.info("response={}", object);
    }
}
