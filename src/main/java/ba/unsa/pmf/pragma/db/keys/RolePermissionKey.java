package ba.unsa.pmf.pragma.db.keys;

import java.io.Serializable;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
public class RolePermissionKey implements Serializable {

    private Short role;
    private Short permission;

    public RolePermissionKey() {
    }

    public RolePermissionKey(Short role_id, Short permission_id) {
        this.role = role_id;
        this.permission = permission_id;
    }
}
