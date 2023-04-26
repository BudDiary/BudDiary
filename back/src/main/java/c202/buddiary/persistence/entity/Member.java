package c202.buddiary.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Member implements UserDetails {
    @Id
    @Column(name = "MEMBER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)

    private String oauth2Id;
    @Builder.Default
    private Long point = 0L;
    @Builder.Default
    private LocalDateTime enrollDate = LocalDateTime.now();

    @ElementCollection
    @Builder.Default
    private List<String> roles= new ArrayList<>(){
        {
            add("USER");
        }
    };

    @Builder.Default
    private boolean accountNonLocked = true;
    @Builder.Default
    private boolean enabled = true;
    @Builder.Default
    private boolean accountNotExpired = true;




    //implements methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 권한 부여
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNotExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
