package ba.unsa.pmf.pragma.web;

import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        User user = userRepository.getUserByEmail(authentication.getName());

        if (user != null && bCryptPasswordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())) {
            return new UsernamePasswordAuthenticationToken(
                    user.getEmail(), user.getPassword(), new ArrayList<>()
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