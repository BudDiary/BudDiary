package twozerotwo.buddiary.global.util;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import twozerotwo.buddiary.global.jwt.service.JwtService;

@Component
@AllArgsConstructor
public class AuthenticationUtil {
	private final JwtService jwtService;


}
