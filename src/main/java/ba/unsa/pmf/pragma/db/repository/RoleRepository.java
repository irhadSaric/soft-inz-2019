package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Short> {

    @Query(value =
            "select r " +
            "from Role r " +
            "inner join UserRole ur on ur.roleId = r.id " +
            "inner join User u on u.id = ur.userId " +
            "where u.id = :userId"
    )
    List<Role> findRolesByUserId(@Param("userId") Long userId);

    @Query(value = "select r from Role r where r.key = :key")
    List<Role> findRolesByKey(@Param("key") String key);
}
