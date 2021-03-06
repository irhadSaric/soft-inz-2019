package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Iteration;
import ba.unsa.pmf.pragma.db.entity.Project;
import ba.unsa.pmf.pragma.db.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query(value = "select i from Iteration i where i.project.id = :teamId order by i.endDate desc")
    List<Iteration> getAllIterationsForProject(@Param("teamId") Long teamId);

    @Query(value = "select p from Project p where p.team.id = :teamId")
    List<Project> getAllByTeamId(@Param("teamId") Long teamId);

    @Query(value = "select i from Iteration i where i.project.id = :projectId and i.status.key = :iterationType order by i.endDate desc")
    List<Iteration> getAllIterationsByType(@Param("projectId") Long projectId, @Param("iterationType") String iterationType);

    @Query(value = "select i from Iteration i where i.project.id = :projectId and i.status.key = 'active-iteration'")
    Iteration getActiveIterationForProject(@Param("projectId") Long projectId);

    @Query(value = "select t from Ticket t where t.project.id= :projectId")
    List<Ticket> getAllTicketsForProject(@Param("projectId") Long projectId);

    @Query(value = "select t from Ticket t where t.project.id= :projectId and t.status.key='backlog-ticket'")
    List<Ticket> getAllBacklogTicketsForProject(@Param("projectId") Long projectId);
}
