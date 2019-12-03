package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Role;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.entity.UserRole;
import ba.unsa.pmf.pragma.db.repository.*;
import ba.unsa.pmf.pragma.service.dtos.LoginRequest;
import ba.unsa.pmf.pragma.service.dtos.RegistrationResponse;
import ba.unsa.pmf.pragma.service.dtos.UserProfileData;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


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
    private CountryRepository countryRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional(readOnly = true)
    public List<User> findAllUsers() {
//      TODO, If user has permission
//        return userRepository.findAllUsers();
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<User> findAllUsersWithEmailContaining(String email) {
//      TODO, If user is active
        return userRepository.findUsersByEmailContaining(email);
    }

    @Transactional(readOnly = true)
    public UserProfileData getUser(Long id) {
        // Method will be used by users to view their profiles and other user profiles
        User user = userRepository.getOne(id);
        return new UserProfileData(
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                user.getCountry()
        );
    }

    @Transactional
    public UserProfileData updateUser(Long id, UserProfileData userProfileData) throws NotFoundException {
        Optional<User> data = userRepository.findById(id);

        if (data.isEmpty()) {
            throw new NotFoundException("No user with specified id was found.");
        }

        User user = data.get();
        user.setFirstName(userProfileData.getFirstName());
        user.setLastName(userProfileData.getLastName());
        user.setEmail(userProfileData.getEmail());
        user.setPhone(userProfileData.getPhone());
        user.setCountry(countryRepository.getOne(userProfileData.getCountry().getId()));
        userRepository.save(user);
        return userProfileData;
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

    @Transactional
    public UserProfileData uploadAvatar(Long id, MultipartFile file) throws NotFoundException, IOException {
        Optional<User> data = userRepository.findById(id);
        UserProfileData userProfileData = new UserProfileData();

        if (data.isEmpty()){
            throw new NotFoundException("User not found.");
        }
        else{
            User user = data.get();
            try {
                String fileName = file.getOriginalFilename();

                if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")){
                    user.setAvatar(file.getBytes());
                    userRepository.save(user);

                    userProfileData.setCountry(user.getCountry());
                    userProfileData.setEmail(user.getEmail());
                    userProfileData.setFirstName(user.getFirstName());
                    userProfileData.setLastName(user.getLastName());
                    userProfileData.setPhone(user.getPhone());

                }
                else{
                    throw new UnsupportedOperationException("Allowed formats: .jpg .jpeg .png");
                }
            } catch (IOException e) {
                throw new IOException("Uploading file failed.");//e.printStackTrace();
            }
        }
        return userProfileData;
    }

    private User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // FIXME: rewrite to fetch all roles with user permissions
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

    public byte[] getAvatar(Long id) throws NotFoundException {
        Optional<User> data = userRepository.findById(id);

        if (data.isEmpty()){
            throw new NotFoundException("User not found.");
        }

        User user = data.get();
        return user.getAvatar();
    }
}
