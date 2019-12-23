package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Iteration;
import ba.unsa.pmf.pragma.db.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IterationRepository extends JpaRepository<Iteration, Long> {
    @Query(value = "select i from Iteration i where i.project.id = :projectId")
    List<Iteration> getAllByProjectId(@Param("projectId") Long projectId);

    @Query(value = "select count (i) from Iteration i "+
                    "inner join Project p on p.id = i.project.id "+
                    "inner join Status s on s.id = i.status.id "+
                    "where p.id=:projectId and s.key='active-iteration'")
    Short getNumberOfActiveIterations(@Param("projectId") Long projectId);
}
