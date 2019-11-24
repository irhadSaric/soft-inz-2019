package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Status;
import ba.unsa.pmf.pragma.db.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author malek.chahin
 * November, 24, 2019.
 */
@Service
public class StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Transactional(readOnly = true)
    public List<Status> getAllStatuses() {
        return statusRepository.findAll();
    }
}
