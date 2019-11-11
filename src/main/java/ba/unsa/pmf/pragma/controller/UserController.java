package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.service.UserService;
import ba.unsa.pmf.pragma.service.dtos.LoginRequest;
import ba.unsa.pmf.pragma.service.dtos.RegistrationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public User getUser(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }
}
