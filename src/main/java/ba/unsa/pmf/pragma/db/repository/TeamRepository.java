package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    @Query(value =
            "select u " +
                    "from User u " +
                    "inner join UserTeam ut on ut.user.id = u.id "+
                    "inner join Team t on t.id = ut.team.id "+
                    "where t.id = :teamId"
    )
    List<User> findTeamMembers(@Param("teamId") Long teamId);
}