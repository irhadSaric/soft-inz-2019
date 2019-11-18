package ba.unsa.pmf.pragma.db.keys;

import java.io.Serializable;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
public class UserRoleKey implements Serializable {

    private Long user;
    private Short role;

    public UserRoleKey() {
    }

    public UserRoleKey(Long user_id, Short role_id) {
        this.user = user_id;
        this.role = role_id;
    }
}
