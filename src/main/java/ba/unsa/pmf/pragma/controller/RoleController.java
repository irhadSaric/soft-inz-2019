package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Role;
import ba.unsa.pmf.pragma.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author malek.chahin
 * November, 24, 2019.
 */
@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/all")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/all/{userId}")
    public List<Role> getRolesForUser(@PathVariable("userId") Long userId) {
        return roleService.getRolesForUser(userId);
    }
}
