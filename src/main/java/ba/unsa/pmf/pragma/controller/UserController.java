package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.service.UserService;
import ba.unsa.pmf.pragma.service.dtos.LoginRequest;
import ba.unsa.pmf.pragma.service.dtos.RegistrationResponse;
import ba.unsa.pmf.pragma.service.dtos.UserProfileData;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/user/find/all")
    public List<User> findAllUsers() {
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

    @PostMapping("/login")
    public RegistrationResponse login(@Valid @RequestBody LoginRequest request) throws Exception {
        return userService.login(request);
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
