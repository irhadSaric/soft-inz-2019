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
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Id
    @Column(name = "role_id", nullable = false)
    private Short roleId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Short getRoleId() {
        return roleId;
    }

    public void setRoleId(Short roleId) {
        this.roleId = roleId;
    }
}
