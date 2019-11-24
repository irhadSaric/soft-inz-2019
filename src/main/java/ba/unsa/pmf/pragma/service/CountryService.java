package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Country;
import ba.unsa.pmf.pragma.db.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author malek.chahin
 * November, 24, 2019.
 */
@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    @Transactional(readOnly = true)
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }
}
