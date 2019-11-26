package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
@Repository
public interface StatusRepository extends JpaRepository<Status, Short> {

    @Query(value= "select s from Status s where s.statusType.key = :key")
    List<Status> getStatusByStatusTypeKey(@Param("key") String key);

    Status getStatusByKey(@Param("key") String key);
}
