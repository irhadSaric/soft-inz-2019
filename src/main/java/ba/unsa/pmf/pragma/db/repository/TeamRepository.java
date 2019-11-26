package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    @Query(
            value =
            "select ut.team " +
            "from UserTeam ut " +
            "inner join Status s on s.id = ut.status.id " +
            "where ut.user.id = :userId " +
            "and s.key = :key"
    )
    List<Team> getTeamsForUserByStatusKey(@Param("userId") Long userId, @Param("key") String key);
}