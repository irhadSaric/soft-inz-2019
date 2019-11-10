package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.UserRole;
import ba.unsa.pmf.pragma.db.keys.UserRoleKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleKey> {
}
