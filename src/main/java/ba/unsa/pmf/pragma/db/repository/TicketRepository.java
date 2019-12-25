package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Ticket;
import ba.unsa.pmf.pragma.service.dtos.TicketResponse;
import org.hibernate.annotations.NamedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query(value = "select t from Ticket t where t.iteration.id = :iterationId")
    List<Ticket> getTicketsForIteration(Long iterationId);

    @Query(value = "select t from Ticket t where t.ticketType.name = :ticketType and t.iteration.id = :iterationId")
    List<Ticket> getTicketByTicketType(Long iterationId, String ticketType);

    @Modifying
    @Query(value = "update Ticket t set t.status.id = :statusId, t.iteration.id = null  where t.iteration.id = :iterationId" )
    void setTicketsToBacklog(Short statusId, Long iterationId);

    @Query(value = "select new ba.unsa.pmf.pragma.service.dtos.TicketResponse(" +
            "t.name, t.description, t.startDate, t.endDate, t.assignee.id, t.status, t.iteration.id, t.ticketType.id," +
            "t.project.id)" +  "from Ticket t where t.iteration.id = ?1")
    List<TicketResponse> getTicketsForIteration2(Long iterationId);

    @Modifying
    @Query(value = "update Ticket t set t.iteration.id = ?1 where t.id in  ?2 ")
    void assignIterationToTickets( Long iterationId, List<Long> tickets);



}
