package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Permission;
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
public interface PermissionRepository extends JpaRepository<Permission, Short> {

    @Query(value =
            "select p " +
            "from Permission p " +
            "inner join RolePermission rp on rp.permissionId = p.id " +
            "inner join Role r on rp.roleId = r.id " +
            "inner join UserRole ur on ur.roleId = r.id " +
            "inner join User u on u.id = ur.userId " +
            "where u.id = :userId"
    )
    List<Permission> findPermissionsByUserId(@Param("userId") Long userId);
}
