package ba.unsa.pmf.pragma.db.keys;

import java.io.Serializable;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
public class UserRoleKey implements Serializable {

    private Long userId;
    private Short roleId;

    public UserRoleKey() {
    }

    public UserRoleKey(Long userId, Short roleId) {
        this.userId = userId;
        this.roleId = roleId;
    }
}
