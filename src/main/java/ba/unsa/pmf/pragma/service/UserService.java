package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Role;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.entity.UserRole;
import ba.unsa.pmf.pragma.db.repository.PermissionRepository;
import ba.unsa.pmf.pragma.db.repository.RoleRepository;
import ba.unsa.pmf.pragma.db.repository.UserRepository;
import ba.unsa.pmf.pragma.db.repository.UserRoleRepository;
import ba.unsa.pmf.pragma.service.dtos.LoginRequest;
import ba.unsa.pmf.pragma.service.dtos.RegistrationResponse;
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
    private PermissionRepository permissionRepository;

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

    @Transactional(readOnly = true)
    public User getUser(Long id) {
        // Method will be used by users to view their profiles and other user profiles
        return userRepository.getOne(id);
    }

    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    @Transactional
    public RegistrationResponse register(User user) {
        this.saveUser(user);
        RegistrationResponse registrationResponse = new RegistrationResponse();
        registrationResponse.setEmail(user.getEmail());
        registrationResponse.setUserId(user.getId());
        registrationResponse.setPermissions(permissionRepository.findPermissionsByUserId(user.getId()));
        registrationResponse.setRoles(roleRepository.findRolesByUserId(user.getId()));
        return registrationResponse;
    }

    @Transactional(readOnly = true)
    public RegistrationResponse login(LoginRequest request) throws Exception {

        User user = userRepository.getUserByEmail(request.getEmail());

        if (user == null) {
            throw new Exception("User not found.");
        } else {
            if (!bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new Exception("Incorrect password!");
            }
            RegistrationResponse registrationResponse = new RegistrationResponse();
            registrationResponse.setEmail(user.getEmail());
            registrationResponse.setUserId(user.getId());
            registrationResponse.setPermissions(permissionRepository.findPermissionsByUserId(user.getId()));
            registrationResponse.setRoles(roleRepository.findRolesByUserId(user.getId()));
            return registrationResponse;
        }
    }

    private User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        List<Role> userRoles = roleRepository.findRolesByKey("user");
        // Create records in the user_roles table to connect the newly created user to the default user permissions
        for (Role role : userRoles) {
            UserRole userRole = new UserRole();
            userRole.setRole(role);
            userRole.setUser(user);
            userRoleRepository.save(userRole);
        }
        return user;
    }
}
