package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.TeamProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamProjectRepository extends JpaRepository<TeamProject,Long> {
}
