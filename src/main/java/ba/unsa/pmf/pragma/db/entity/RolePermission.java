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
    @Column(name = "role_id", nullable = false)
    private Short roleId;

    @Id
    @Column(name = "permission_id", nullable = false)
    private Short permissionId;

    public Short getRole() {
        return roleId;
    }

    public void setRole(Short roleId) {
        this.roleId = roleId;
    }

    public Short getPermission() {
        return permissionId;
    }

    public void setPermission(Short permissionId) {
        this.permissionId = permissionId;
    }
}
