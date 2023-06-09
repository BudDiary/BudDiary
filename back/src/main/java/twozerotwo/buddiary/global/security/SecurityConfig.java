package twozerotwo.buddiary.global.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import twozerotwo.buddiary.global.auth.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import twozerotwo.buddiary.global.auth.handler.LoginFailHandler;
import twozerotwo.buddiary.global.auth.handler.LoginSuccessHandler;
import twozerotwo.buddiary.global.auth.service.LoginService;
import twozerotwo.buddiary.global.jwt.filter.JwtAuthenticationProcessingFilter;
import twozerotwo.buddiary.global.jwt.service.JwtService;
import twozerotwo.buddiary.global.oauth.cookie.HttpCookieOAuth2AuthorizationRequestRepository;
import twozerotwo.buddiary.global.oauth.hadler.OAuth2LoginFailHandler;
import twozerotwo.buddiary.global.oauth.hadler.OAuth2LoginSuccessHandler;
import twozerotwo.buddiary.global.oauth.service.CustomOauthUserService;
import twozerotwo.buddiary.persistence.repository.MemberRepository;

/**
 * 인증은 CustomJsonUsernamePasswordAuthenticationFilter에서 authenticate()로 인증된 사용자로 처리
 * JwtAuthenticationProcessingFilter는 AccessToken, RefreshToken 재발급
 */
// @EnableWebSecurity(debug = true)
@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

	private final LoginFailHandler loginFailureHandler;
	private final LoginService loginService;
	private final JwtService jwtService;
	private final MemberRepository memberRepository;
	private final ObjectMapper objectMapper;
	private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
	private final OAuth2LoginFailHandler oAuth2LoginFailureHandler;
	private final CustomOauthUserService customOAuth2UserService;

	@Bean
	public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
		CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordLoginFilter
			= new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
		customJsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
		customJsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
		customJsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler);
		return customJsonUsernamePasswordLoginFilter;
	}

	// @Bean
	// public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
	// 	return new HttpCookieOAuth2AuthorizationRequestRepository();
	// }

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.formLogin()
			.disable() // FormLogin 사용 X
			.httpBasic()
			.disable() // httpBasic 사용 X
			.csrf()
			.disable() // csrf 보안 사용 X
			.cors().configurationSource(corsConfigurationSource()).and()
			.headers()
			.frameOptions()
			.disable()
			.and()

			// 세션 사용하지 않으므로 STATELESS로 설정
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			//== URL별 권한 관리 옵션 ==//
			.authorizeRequests()
			.requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
			// ELB  health 체크를위한  api 오픈
			.antMatchers("/actuator/health", "/actuator/info").permitAll()
			.antMatchers(HttpMethod.GET, "/api/members/**").hasRole("USER")
			.antMatchers(HttpMethod.PATCH, "/api/members/**").hasRole("USER")
			.antMatchers(HttpMethod.GET, "/api/members/jwt-test").hasRole("USER")
			.antMatchers(HttpMethod.POST, "/api/members/signup/**").hasRole("GUEST")
			.anyRequest()
			.permitAll()// 위의 경로 이외에는 모두 인증된 사용자만 접근 가능
			.and()
			//== 소셜 로그인 설정 ==//
			.oauth2Login()
			.authorizationEndpoint().baseUri("/oauth2/authorize")
			// .authorizationRequestRepository(cookieAuthorizationRequestRepository())
			.and()
			.redirectionEndpoint()
			// .baseUri("/login/oauth2/code/kakao/code*")
			.and()
			.userInfoEndpoint()
			.userService(customOAuth2UserService)
			.and()
			.successHandler(oAuth2LoginSuccessHandler) // 동의하고 계속하기를 눌렀을 때 Handler 설정
			.failureHandler(oAuth2LoginFailureHandler); // 소셜 로그인 실패 시 핸들러 설정

		// 원래 스프링 시큐리티 필터 순서가 LogoutFilter 이후에 로그인 필터 동작
		// 따라서, LogoutFilter 이후에 우리가 만든 필터 동작하도록 설정
		// 순서 : LogoutFilter -> JwtAuthenticationProcessingFilter -> CustomJsonUsernamePasswordAuthenticationFilter
		http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
		http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);

		return http.build();

	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.addAllowedOriginPattern("http://localhost:8000");
		corsConfiguration.addAllowedOriginPattern("http://localhost:3000");
		corsConfiguration.addAllowedOriginPattern("http://www.buddiary.site");
		corsConfiguration.addAllowedOriginPattern("http://ec2-3-36-102-176.ap-northeast-2.compute.amazonaws.com");
		corsConfiguration.addAllowedOriginPattern("http://ec2-3-35-197-93.ap-northeast-2.compute.amazonaws.com");
		corsConfiguration.addAllowedHeader("*");
		// corsConfiguration.addAllowedOrigin("http://localhost:3000");
		// corsConfiguration.addAllowedOrigin("http://localhost:8080");
		corsConfiguration.addAllowedMethod("*");
		corsConfiguration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}

	// @Bean
	// public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
	// 	return new HttpCookieOAuth2AuthorizationRequestRepository();
	// }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	/**
	 * AuthenticationManager 설정 후 등록
	 * PasswordEncoder를 사용하는 AuthenticationProvider 지정 (PasswordEncoder는 위에서 등록한 PasswordEncoder 사용)
	 * FormLogin(기존 스프링 시큐리티 로그인)과 동일하게 DaoAuthenticationProvider 사용
	 * UserDetailsService는 커스텀 LoginService로 등록
	 * 또한, FormLogin과 동일하게 AuthenticationManager로는 구현체인 ProviderManager 사용(return ProviderManager)
	 */
	@Bean
	public AuthenticationManager authenticationManager() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder());
		provider.setUserDetailsService(loginService);
		return new ProviderManager(provider);
	}

	/**
	 * 로그인 성공 시 호출되는 LoginSuccessJWTProviderHandler 빈 등록
	 */
	@Bean
	public LoginSuccessHandler loginSuccessHandler() {
		return new LoginSuccessHandler(jwtService, memberRepository);
	}

	/**
	 * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
	 */
	// @Bean
	// public LoginFailHandler loginFailureHandler() {
	// 	return new LoginFailHandler();
	// }

	/**
	 * CustomJsonUsernamePasswordAuthenticationFilter 빈 등록
	 * 커스텀 필터를 사용하기 위해 만든 커스텀 필터를 Bean으로 등록
	 * setAuthenticationManager(authenticationManager())로 위에서 등록한 AuthenticationManager(ProviderManager) 설정
	 * 로그인 성공 시 호출할 handler, 실패 시 호출할 handler로 위에서 등록한 handler 설정
	 */

	@Bean
	public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
		JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService,
			memberRepository);
		return jwtAuthenticationFilter;
	}
}
