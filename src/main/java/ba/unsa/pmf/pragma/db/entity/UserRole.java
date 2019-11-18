package ba.unsa.pmf.pragma.db.entity;

import ba.unsa.pmf.pragma.db.keys.UserRoleKey;

import javax.persistence.*;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
@Entity
@Table(name = "user_roles")
@IdClass(UserRoleKey.class)
public class UserRole {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
