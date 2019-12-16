package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketTypeRepository extends JpaRepository<TicketType,Short> {
}
