package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, Long>{
}
