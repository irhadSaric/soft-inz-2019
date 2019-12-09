package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.*;
import ba.unsa.pmf.pragma.db.repository.*;
import ba.unsa.pmf.pragma.service.dtos.CreateTicketRequest;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    IterationRepository iterationRepository;

    @Autowired
    StatusRepository statusRepository;

    @Autowired
    TicketTypeRepository ticketTypeRepository;

    public Ticket create(CreateTicketRequest request) throws NotFoundException {
        Ticket ticket = new Ticket();
        ticket.setName(request.getName());
        ticket.setDescription(request.getDescription());
        ticket.setEndDate(request.getEndDate());
        ticket.setStartDate(new Date());

        Optional<User> assignee = userRepository.findById(request.getAssigneeId());
        if(assignee.isEmpty()){
            throw new NotFoundException("User not found");
        }
        ticket.setAssignee(assignee.get());

        Optional<Status> status = statusRepository.findById(request.getStatusId());
        if(status.isEmpty())
        {
            throw new NotFoundException("Status not found");
        }
        ticket.setStatus(status.get());

        Optional<TicketType> ticketType = ticketTypeRepository.findById(request.getTicketTypeId());
        if(ticketType.isEmpty())
        {
            throw new NotFoundException("Ticket type not found");
        }
        ticket.setTicketType(ticketType.get());

        Optional<Iteration> iteration = iterationRepository.findById(request.getIterationId());
        if(iteration.isEmpty())
        {
            throw new NotFoundException("Iteration not found");
        }
        ticket.setIteration(iteration.get());

        ticket = ticketRepository.save(ticket);

        return ticket;
    }
}
