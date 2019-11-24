package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Role;
import ba.unsa.pmf.pragma.db.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author malek.chahin
 * November, 24, 2019.
 */
@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Transactional(readOnly = true)
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Role> getRolesForUser(Long userId) {
        return roleRepository.findRolesByUserId(userId);
    }
}
