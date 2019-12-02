package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.StatusType;
import ba.unsa.pmf.pragma.db.repository.StatusTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StatusTypeService{
    @Autowired
    private StatusTypeRepository statusTypeRepository;

    @Transactional(readOnly = true)
    public List<StatusType> getAllStatusTypes() { return statusTypeRepository.findAll(); }
}
