package ba.unsa.pmf.pragma.web;

import ba.unsa.pmf.pragma.db.entity.Role;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.repository.RoleRepository;
import ba.unsa.pmf.pragma.db.repository.UserRepository;
import ba.unsa.pmf.pragma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmail(email);
        List<Role> roles = roleRepository.findRolesByUserId(user.getId());
        UserDetailsImpl userDetails;
        if(user != null){
            userDetails = new UserDetailsImpl();
            userDetails.setUser(user);
            userDetails.setRoles(roles);
        }
        else{
            throw new UsernameNotFoundException("User not found.");
        }
        return userDetails;
//        org.springframework.security.core.userdetails.User.UserBuilder userBuilder = null;
//        if(user != null){
//            userBuilder = org.springframework.security.core.userdetails.User.withUsername(email);
//            userBuilder.password(bCryptPasswordEncoder.encode(user.getPassword()));
//            List<Role> roles = roleRepository.findRolesByUserId(user.getId());
//            List<String> array = new ArrayList<>();
//            for(Role role: roles){
//                array.add(role.getKey());
//            }
//            userBuilder.roles("Admin", "User");
//        }
//        else
//        {
//            throw new UsernameNotFoundException("User not found.");
//        }
//
//        return userBuilder.build();
    }
}
