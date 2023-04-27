package twozerotwo.buddiary.global.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import twozerotwo.buddiary.global.service.JwtTokenProvider;
import twozerotwo.buddiary.global.service.KakaoOauthService;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtTokenProvider jwtTokenProvider;
	private final JwtExceptionFilter jwtExceptionFilter;
	private final KakaoOauthService kakaoOauthService;

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http.httpBasic().disable()
			.formLogin().disable()
			.cors()
			.and()
			.csrf().disable()
			.headers().frameOptions().sameOrigin()
			.and()

			.authorizeRequests()
			.antMatchers("/api/members/sighup", "/api/members/login")
			.permitAll()
			.anyRequest()
			.permitAll()
			.and()

			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()

			.oauth2Login()
			.and()
			.addFilterBefore(new JwtFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
			.addFilterBefore(jwtExceptionFilter, JwtFilter.class)
			.csrf()
			.ignoringAntMatchers("/h2-console/**").disable()
			.build();
	}
}
