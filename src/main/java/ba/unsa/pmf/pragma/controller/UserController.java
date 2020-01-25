package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.service.UserService;
import ba.unsa.pmf.pragma.service.dtos.LoginRequest;
import ba.unsa.pmf.pragma.service.dtos.RegistrationResponse;
import ba.unsa.pmf.pragma.service.dtos.UserProfileData;
import ba.unsa.pmf.pragma.web.CustomAuthenticationProvider;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

/**
 * @author malek.chahin
 * November, 06, 2019.
 */
@RestController
//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomAuthenticationProvider authenticationProvider;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/api/user/find/all")
    public List<User> findAllUsers() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        System.out.println(securityContext.getAuthentication().getAuthorities());
        System.out.println(securityContext.getAuthentication().getCredentials());
        System.out.println(securityContext.getAuthentication().isAuthenticated());
        return userService.findAllUsers();
    }

    @GetMapping("/api/user/find/{email}")
    public List<User> findAllUsersWithEmailContaining(@PathVariable("email") String email) {
        return userService.findAllUsersWithEmailContaining(email);
    }

    @PostMapping("/register")
    public RegistrationResponse register(@Valid @RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/api/login")
    public RegistrationResponse login(@Valid @RequestBody LoginRequest request) throws Exception {
        Authentication authentication = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        if(authentication != null){
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);
            return userService.login(request);
        }
        else{
            throw new Exception("Error with authentication.");
        }

    }

    @GetMapping("/api/user/profile/{id}")
    public UserProfileData
    getUser(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @PutMapping("/api/user/profile/{id}")
    public UserProfileData
    updateUser(@PathVariable("id") Long id, @RequestBody UserProfileData userProfileData)
    throws NotFoundException {
        return userService.updateUser(id, userProfileData);
    }

    @PostMapping("/api/user/profile/{id}/upload")
    public UserProfileData
    uploadAvatar(@PathVariable Long id, @RequestBody MultipartFile file)
    throws NotFoundException, IOException {
        return userService.uploadAvatar(id, file);
    }

    @GetMapping("/api/user/profile/{id}/avatar")
    public byte[] getAvatar(@PathVariable Long id)
    throws NotFoundException {
        return userService.getAvatar(id);
    }

    @GetMapping("/api/get-users-for-invitation/{userId}")
    public List<User> getUsersForInvitation(@PathVariable Long userId) {
        return userService.findUsersForInvitation(userId);
    }
}
