package ba.unsa.pmf.pragma.db.entity;

import ba.unsa.pmf.pragma.db.keys.RolePermissionKey;

import javax.persistence.*;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
@Entity
@Table(name = "roles_permissions")
@IdClass(RolePermissionKey.class)
public class RolePermission {

    @Id
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Id
    @ManyToOne
    @JoinColumn(name = "permission_id", nullable = false)
    private Permission permission;

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }
}
