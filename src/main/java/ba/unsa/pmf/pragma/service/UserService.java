package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Role;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.entity.UserRole;
import ba.unsa.pmf.pragma.db.repository.RoleRepository;
import ba.unsa.pmf.pragma.db.repository.UserRepository;
import ba.unsa.pmf.pragma.db.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * @author malek.chahin
 * November, 09, 2019.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional(readOnly = true)
    public List<User> findAllUsers() {
//      TODO, If user has permission
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<User> findAllUsersWithEmailContaining(String email) {
//      TODO, If user is active
        return userRepository.findUsersByEmailContaining(email);
    }

    @Transactional
    public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        List<Role> userRoles = roleRepository.findRolesByKey("user");
        for (Role role : userRoles) {
            UserRole userRole = new UserRole();
            userRole.setRole(role);
            userRole.setUser(user);
            userRoleRepository.save(userRole);
        }
        // Create records in the user_roles table to connect the newly created user to the default user permissions
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User getUser(Long id) {
        // Method will be used by users to view their profiles and other user profiles
        return userRepository.getOne(id);
    }

    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }
}
