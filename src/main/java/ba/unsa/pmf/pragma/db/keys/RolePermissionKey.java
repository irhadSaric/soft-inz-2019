package ba.unsa.pmf.pragma.db.keys;

import ba.unsa.pmf.pragma.db.entity.Permission;
import ba.unsa.pmf.pragma.db.entity.Role;

import java.io.Serializable;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
public class RolePermissionKey implements Serializable {

    private Role role;
    private Permission permission;

    public RolePermissionKey() {
    }

    public RolePermissionKey(Role role, Permission permission) {
        this.role = role;
        this.permission = permission;
    }
}
