package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.*;
import ba.unsa.pmf.pragma.db.repository.*;
import ba.unsa.pmf.pragma.service.dtos.CreateTicketRequest;
import ba.unsa.pmf.pragma.service.dtos.TicketResponse;
import ba.unsa.pmf.pragma.service.dtos.NameAndDescription;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public TicketResponse create(CreateTicketRequest request) throws NotFoundException {
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

        Optional<TicketType> ticketType = ticketTypeRepository.findById((request.getTicketTypeId()));
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

       return new TicketResponse(ticket.getName(),ticket.getDescription(),
                ticket.getStartDate(),ticket.getEndDate(),ticket.getAssignee().getId(),ticket.getStatus().getId(),
                ticket.getIteration().getId(),ticket.getTicketType().getId());
    }

    public void changeTypeOfTicket(Long ticketId, Short ticketTypeId) throws  NotFoundException {
        Optional<TicketType> ticketType = ticketTypeRepository.findById(ticketTypeId);
        if(ticketType.isEmpty())
        {
            throw new NotFoundException("Ticket type not found");
        }
        Ticket ticket = getTicketById(ticketId);
        ticket.setTicketType(ticketType.get());
        ticketRepository.save(ticket);
    }

    public void changeStatusOfTicket(Long ticketId, Short statusId) throws NotFoundException{
        Optional<Status> ticketStatus = statusRepository.findById(statusId);
        if(ticketStatus.isEmpty())
        {
            throw new NotFoundException("Status not found");
        }
        Ticket ticket = getTicketById(ticketId);
        ticket.setStatus(ticketStatus.get());
        ticketRepository.save(ticket);
    }

    private Ticket getTicketById(Long id) throws  NotFoundException{
        Optional<Ticket> ticket = ticketRepository.findById(id);
        if(ticket.isEmpty())
        {
            throw new NotFoundException("Ticket not found");
        }
        return  ticket.get();
    }

    public void editNameAndDescription(Long ticketId, NameAndDescription request) throws NotFoundException {
        Ticket ticket = getTicketById(ticketId);

        ticket.setName(request.getName());
        ticket.setDescription((request.getDescription()));
        ticketRepository.save(ticket);
    }

    public void assignUserToTask(Long ticketId, Long userId) throws NotFoundException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty())
        {
            throw new NotFoundException("User not found");
        }

        Ticket ticket = getTicketById(ticketId);
        ticket.setAssignee(user.get());
        ticketRepository.save(ticket);
    }

    public TicketResponse getTicket(Long ticketId) throws  NotFoundException {
        Ticket ticket = getTicketById(ticketId);

        return new TicketResponse(ticket.getName(),ticket.getDescription(),
                ticket.getStartDate(),ticket.getEndDate(),ticket.getAssignee().getId(),ticket.getStatus().getId(),
                ticket.getIteration().getId(),ticket.getTicketType().getId());
    }
}
