package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query(value = "select t from Ticket t where t.iteration.id = :iterationId")
    List<Ticket> getTicketsForIteration(Long iterationId);

    @Modifying
    @Query(value = "update Ticket t set t.status.id = :statusId where t.iteration.id = :iterationId" )
    void setTicketsToBacklog(Short statusId, Long iterationId);


}
