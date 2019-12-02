package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author malek.chahin
 * November, 24, 2019.
 */
@Repository
public interface StatusTypeRepository extends JpaRepository<StatusType, Long> {
}
