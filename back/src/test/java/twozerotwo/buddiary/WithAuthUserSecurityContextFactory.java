package twozerotwo.buddiary;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import twozerotwo.buddiary.annotaion.WithAuthUser;

/**
 * WithSecurityContextFactory 구현체
 */
public class WithAuthUserSecurityContextFactory implements WithSecurityContextFactory<WithAuthUser> {

	private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

	@Override
	public SecurityContext createSecurityContext(WithAuthUser annotation) {
		String userName = annotation.username();
		String role = annotation.role();
		UserDetails userDetailsUser = User.builder()
			.username(userName)
			.password("test")
			.roles("ROLE_"+role)
			.build();
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetailsUser, null,
			authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));
		SecurityContext context = SecurityContextHolder.getContext();
		context.setAuthentication(token);

		return context;
	}
}
