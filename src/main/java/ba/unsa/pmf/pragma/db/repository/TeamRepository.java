package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

}