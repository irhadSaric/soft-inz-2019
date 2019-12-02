package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.service.dtos.UserProfileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author malek.chahin
 * November, 06, 2019.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(
            value =
            "select new ba.unsa.pmf.pragma.service.dtos.UserProfileData(" +
            "u.email, u.firstName, u.lastName, u.phone, u.country" +
            ") " +
            "from User u " +
            "where u.email like concat('%', :email, '%')"
    )
    List<UserProfileData> findUsersByEmailContaining(@Param("email") String email);

    @Query(
            value =
            "select new ba.unsa.pmf.pragma.service.dtos.UserProfileData(" +
            "u.email, u.firstName, u.lastName, u.phone, u.country" +
            ")" +
            "from User u"
    )
    List<UserProfileData> findAllUsers();

    User getUserByEmail(@Param("email") String email);

    @Query(value = "select ut.user from UserTeam ut where ut.team.id = :teamId and ut.status.key = :key")
    List<User> getUsersByTeamAndStatusKey(@Param("teamId") Long teamId, @Param("key") String key);
}
