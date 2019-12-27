package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.UserTeam;
import ba.unsa.pmf.pragma.service.dtos.TeamInviteResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {

    @Query(value = "select t.team from UserTeam t where t.user.id = :userId")
    List<Team> getTeamsForUser(@Param("userId") Long userId);

    @Query(
        value =
        "select ut " +
        "from UserTeam ut " +
        "inner join Status s on s.id = ut.status.id " +
        "where ut.user.id = :userId " +
        "and s.key = :key"
    )
    List<UserTeam> getUserTeamsForUserByStatusKey(@Param("userId") Long userId, @Param("key") String key);

    @Query(
        value =
        "select new " +
        "ba.unsa.pmf.pragma.service.dtos.TeamInviteResponse(" +
                "ut.user.id, ut.team.id, ut.team.name, ut.role.name, ut.role.key, s" +
        ") " +
        "from UserTeam ut " +
        "inner join Status s on s.id = ut.status.id " +
        "where ut.user.id = :userId " +
        "and s.key = :key"
    )
    List<TeamInviteResponse> getUserTeamResponseForUserByStatusKey(@Param("userId") Long userId, @Param("key") String key);

    @Query(
        value =
        "select ut " +
        "from UserTeam ut " +
        "where ut.user.id = :userId " +
        "and ut.team.id = :teamId " +
        "and ut.status.key = :key"
    )
    List<UserTeam> getByUserIdAndTeamIdAndKey(@Param("userId") Long userId, @Param("teamId") Long teamId, @Param("key") String key);

    @Query(value = "select ut from UserTeam ut where ut.team.id = :teamId")
    List<UserTeam> getByTeamId(@Param("teamId") Long teamId);

    @Query(value = "select ut from UserTeam ut where ut.team.id = :teamId and ut.user.id = :userId")
    UserTeam getByTeamIdAndUserId(@Param("teamId") Long teamId, @Param("userId") Long userId);

}