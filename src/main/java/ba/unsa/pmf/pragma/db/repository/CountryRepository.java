package ba.unsa.pmf.pragma.db.repository;

import ba.unsa.pmf.pragma.db.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author malek.chahin
 * November, 10, 2019.
 */
@Repository
public interface CountryRepository extends JpaRepository<Country, Short> {
}
