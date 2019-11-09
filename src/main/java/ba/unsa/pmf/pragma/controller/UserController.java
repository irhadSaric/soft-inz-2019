package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
//        TODO, malek.chahin: Can be accessed by admin only
        return userRepository.findAll();
    }

    @GetMapping("/search/{email}")
    public List<User> getAllUsersWithMailContaining(@PathVariable("email") String email) {
        return userRepository.findUsersByEmailContaining(email);
    }

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) {
//        TODO, malek.chahin: Save if email is unique
//        This check is maybe already provided because of the entity
        return userRepository.save(user);
    }
}
