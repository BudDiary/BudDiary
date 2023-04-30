package twozerotwo.buddiary.global.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class LogAop {
	@Before("execution(* twozerotwo.buddiary..*(..)) && !execution(* twozerotwo.buddiary..*.filter..*(..))")
	public void before(JoinPoint joinPoint) {
		log.info("[log] {} -> {} 실행", joinPoint.getSignature().getDeclaringType().getSimpleName(),
			joinPoint.getSignature().getName());
	}

	@After("execution(* twozerotwo.buddiary..*(..)) && !execution(* twozerotwo.buddiary..*.filter..*(..))")
	public void after(JoinPoint joinPoint) {
		log.info("[log] {} -> {} 종료", joinPoint.getSignature().getDeclaringType().getSimpleName(),
			joinPoint.getSignature().getName());
	}
}