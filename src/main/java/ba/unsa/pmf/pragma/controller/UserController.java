package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author malek.chahin
 * November, 06, 2019.
 */
@RestController
@RequestMapping("api/user")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @GetMapping("/find/all")
    public List<User> findAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/find/{email}")
    public List<User> findAllUsersWithEmailContaining(@PathVariable("email") String email) {
        return userService.findAllUsersWithEmailContaining(email);
    }

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/profile/{id}")
    public User getUser(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }
}
