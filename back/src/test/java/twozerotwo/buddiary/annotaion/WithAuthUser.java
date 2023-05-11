package twozerotwo.buddiary.annotaion;

import org.springframework.security.test.context.support.WithSecurityContext;

import twozerotwo.buddiary.WithAuthUserSecurityContextFactory;
import twozerotwo.buddiary.persistence.enums.Role;

@WithSecurityContext(factory = WithAuthUserSecurityContextFactory.class)
public @interface WithAuthUser {
	String username();
	String role();
}
