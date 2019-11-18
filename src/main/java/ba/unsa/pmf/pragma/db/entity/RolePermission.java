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

    @ManyToOne
    @JoinColumn(name = "permission_id")
    private Permission permission;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public void setRole(Role role) {
        this.role = role;
    }

    public Short getRoleId() {
        return roleId;
    }

    public void setRoleId(Short roleId) {
        this.roleId = roleId;
    }

    public Short getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Short permissionId) {
        this.permissionId = permissionId;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }

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
