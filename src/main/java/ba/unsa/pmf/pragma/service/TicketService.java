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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private IterationRepository iterationRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Transactional
    public TicketResponse create(CreateTicketRequest request) throws NotFoundException {
        Ticket ticket = new Ticket();
        ticket.setName(request.getName());
        ticket.setDescription(request.getDescription());
        ticket.setEndDate(request.getEndDate());
        ticket.setStartDate(new Date());

        Status ticketStatus = statusRepository.getStatusByKey("backlog");
        ticket.setStatus(ticketStatus);

        Optional<Project> project = projectRepository.findById(request.getProjectId());
        if(project.isEmpty()){
            throw new NotFoundException("Ticket type not found");
        }
        ticket.setProject(project.get());
        ticket = ticketRepository.save(ticket);

        return entityToDto(ticket);
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

        TicketResponse response = entityToDto(ticket);
        if(ticket.getTicketType()!= null)
           response.setTicketTypeId(ticket.getTicketType().getId());
        if(ticket.getIteration() != null)
            response.setIterationId(ticket.getIteration().getId());
        if(ticket.getAssignee() != null)
            response.setAssigneeId(ticket.getAssignee().getId());
        return response;
    }
    @Transactional
    public void assignIterationToTickets(List<Long> tickets, Long iterationId) throws NotFoundException {
        Optional<Iteration> iteration = iterationRepository.findById(iterationId);
        if(iteration.isEmpty())
        {
            throw new NotFoundException("Iteration not found");
        }
        ticketRepository.assignIterationToTickets(iterationId,tickets);
    }

    @Transactional
    public List<TicketResponse> findTicketsByType(Long iterationId, String ticketType){
        List<Ticket> tickets = ticketRepository.getTicketByTicketType(iterationId, ticketType);
        List<TicketResponse> response = new ArrayList<>();
        tickets.forEach(ticket -> response.add(entityToDtoFull(ticket)));
        return response;
    }

    private TicketResponse entityToDto(Ticket ticket)
    {
       return  new TicketResponse(ticket.getName(),ticket.getDescription(), ticket.getStartDate(),
                ticket.getEndDate(),ticket.getStatus(),ticket.getProject().getId());

    }

    private TicketResponse entityToDtoFull(Ticket ticket)
    {
       return new TicketResponse(ticket.getName(),ticket.getDescription(),
                ticket.getStartDate(),ticket.getEndDate(),ticket.getAssignee().getId(),ticket.getStatus(),
                ticket.getIteration().getId(),ticket.getTicketType().getId(),ticket.getProject().getId());
    }
}
