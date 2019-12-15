package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.TicketType;
import ba.unsa.pmf.pragma.db.repository.TicketTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TicketTypeService {

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    @Transactional(readOnly = true)
    public List<TicketType> getAllTicketTypes() { return ticketTypeRepository.findAll(); }
}

