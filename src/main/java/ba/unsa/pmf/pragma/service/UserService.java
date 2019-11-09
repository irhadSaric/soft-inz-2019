package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * @author malek.chahin
 * November, 09, 2019.
 */
@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository repository) {
        userRepository = repository;
    }

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
//        TODO, If user has permission
//        TODO, malek.chahin: Save if email is unique
//        This check is maybe already provided because of the entity
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User getUser(Long id) {
        // Method will be used by users to view their profiles and other user profiles
        return userRepository.getOne(id);
    }
}
