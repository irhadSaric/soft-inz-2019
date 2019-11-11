package ba.unsa.pmf.pragma.service.dtos;

import ba.unsa.pmf.pragma.db.entity.Permission;
import ba.unsa.pmf.pragma.db.entity.Role;

import java.util.List;

/**
 * @author malek.chahin
 * November, 11, 2019.
 */
public class RegistrationResponse {

    private Long userId;
    private String email;
    private List<Role> roles;
    private List<Permission> permissions;

    public RegistrationResponse() {
    }

    public RegistrationResponse(Long userId, String email, List<Role> roles, List<Permission> permissions) {
        this.userId = userId;
        this.email = email;
        this.roles = roles;
        this.permissions = permissions;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }
}
