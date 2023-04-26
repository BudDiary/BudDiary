package twozerotwo.buddiary.global.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class LogAop {
	@Before("execution(* twozerotwo.buddiary..*(..)) && !execution(* twozerotwo.buddiary.global.auth..*(..))")
	public void before(JoinPoint joinPoint) {
		log.info("[log] {} -> {} 실행", joinPoint.getSignature().getDeclaringType().getSimpleName(),
			joinPoint.getSignature().getName());
	}

	@After("execution(* twozerotwo.buddiary..*(..)) && !execution(* twozerotwo.buddiary.global.auth..*(..))")
	public void after(JoinPoint joinPoint) {
		log.info("[log] {} -> {} 종료", joinPoint.getSignature().getDeclaringType().getSimpleName(),
			joinPoint.getSignature().getName());
	}

	// @AfterThrowing(value =
	// 	"execution(* twozerotwo.buddiary..*(..)) && !execution(* com.c211.opinbackend.config..*(..))"
	// 		+ "&& !execution(* twozerotwo.buddiary.global.auth.*(..))", throwing = "exception")
	// public void writeFailLog(JoinPoint joinPoint, Exception exception) throws RuntimeException {
	// 	//logging
	// 	//exception 으로 해당 메서드에서 발생한 예외가져오기 가능
	// 	exception.printStackTrace();
	// }

}