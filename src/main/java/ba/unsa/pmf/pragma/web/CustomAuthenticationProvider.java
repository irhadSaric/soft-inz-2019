package ba.unsa.pmf.pragma.web;

import ba.unsa.pmf.pragma.db.entity.Role;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.repository.RoleRepository;
import ba.unsa.pmf.pragma.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        User user = userRepository.getUserByEmail(authentication.getName());
        List<Role> roles = roleRepository.findRolesByUserId(user.getId());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (user != null && bCryptPasswordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())) {
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            for (Role role: roles){
                grantedAuthorities.add(new SimpleGrantedAuthority(role.getKey()));
            }
            return new UsernamePasswordAuthenticationToken(
                    user.getEmail(), user.getPassword(), grantedAuthorities
            );
        } else {
            return null;
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}