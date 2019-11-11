package ba.unsa.pmf.pragma.db.keys;

import java.io.Serializable;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
public class RolePermissionKey implements Serializable {

    private Short roleId;
    private Short permissionId;

    public RolePermissionKey() {
    }

    public RolePermissionKey(Short roleId, Short permissionId) {
        this.roleId = roleId;
        this.permissionId = permissionId;
    }
}
