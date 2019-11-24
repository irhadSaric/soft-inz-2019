package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Permission;
import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam,Long> {
    @Query(value =
            "select t.team from UserTeam t where t.user.id = :userId"
    )
    List<Team> getTeamsForUser(@Param("userId") Long userId);

    @Query(value ="select u " +
            "from User u " +
            "inner join UserTeam ut on ut.user.id = u.id "+
            "inner join Team t on t.id = ut.team.id "+
            "where t.id = :teamId"
    )
    List<User> getTeamMembers(@Param("teamId") Long teamId);
}