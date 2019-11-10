package ba.unsa.pmf.pragma.db.keys;

import ba.unsa.pmf.pragma.db.entity.Role;
import ba.unsa.pmf.pragma.db.entity.User;

import java.io.Serializable;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
public class UserRoleKey implements Serializable {

    private User user;
    private Role role;

    public UserRoleKey() {
    }

    public UserRoleKey(User user, Role role) {
        this.user = user;
        this.role = role;
    }
}
