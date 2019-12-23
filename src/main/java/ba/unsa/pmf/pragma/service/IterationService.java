package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Iteration;
import ba.unsa.pmf.pragma.db.entity.Project;
import ba.unsa.pmf.pragma.db.entity.Status;
import ba.unsa.pmf.pragma.db.entity.Ticket;
import ba.unsa.pmf.pragma.db.repository.IterationRepository;
import ba.unsa.pmf.pragma.db.repository.ProjectRepository;
import ba.unsa.pmf.pragma.db.repository.StatusRepository;
import ba.unsa.pmf.pragma.db.repository.TicketRepository;
import ba.unsa.pmf.pragma.service.dtos.CreateIterationRequest;
import ba.unsa.pmf.pragma.service.dtos.IterationResponse;
import ba.unsa.pmf.pragma.service.dtos.TicketResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class IterationService {
    @Autowired
    private IterationRepository iterationRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Transactional
    public IterationResponse createIteration(CreateIterationRequest createIterationRequest) throws NotFoundException {

        Iteration iteration = new Iteration();
        iteration.setDescription(createIterationRequest.getDescription());
        iteration.setEndDate(createIterationRequest.getEndDate());
        iteration.setStartDate(new Date(System.currentTimeMillis()));
        iteration.setName(createIterationRequest.getName());

        Optional<Project> project = projectRepository.findById(createIterationRequest.getProjectId());
        if(project.isEmpty()){
            throw new NotFoundException("Project not found");
        }

        iteration.setProject(project.get());
        Status status = statusRepository.getStatusByKey("active-iteration");
        iteration.setStatus(status);

        iteration = iterationRepository.save(iteration);
        return entityToDto(iteration);
    }

    public IterationResponse getIteration(Long id) throws NotFoundException {
        Optional<Iteration> iteration = iterationRepository.findById(id);
        if(iteration.isEmpty()){
            throw new NotFoundException("Iteration not found");
        }

        return entityToDto(iteration.get());
    }

    @Transactional(readOnly = true)
    public List<IterationResponse> findAll() {

        List<Iteration> iterations =  iterationRepository.findAll();
        List<IterationResponse> response = new ArrayList<>();
        iterations.forEach(iteration -> response.add(entityToDto(iteration)));
        return  response;
    }

    @Transactional(readOnly = true)
    public List<TicketResponse> getAllIterationTickets(Long iterationId) {
        List<Ticket> tickets =  ticketRepository.getTicketsForIteration(iterationId);
        List<TicketResponse> response = new ArrayList<>();
        tickets.forEach(ticket -> response.add(new TicketResponse(ticket.getName(),ticket.getDescription(),
                ticket.getStartDate(),ticket.getEndDate(),ticket.getAssignee().getId(),ticket.getStatus(),
                ticket.getIteration().getId(),ticket.getTicketType().getId())));
        return response;
    }

    @Transactional
    public void finishIteration(Long iterationId) throws NotFoundException {
        Optional<Iteration> iterationOpt = iterationRepository.findById(iterationId);

        if (iterationOpt.isEmpty()) {
            throw new NotFoundException("Iteration not found");
        }

        Status status = statusRepository.getStatusByKey("closed-iteration");
        Iteration iteration = iterationOpt.get();
        iteration.setStatus(status);
        iterationRepository.save(iteration);
        Status ticketStatus = statusRepository.getStatusByKey("backlog");
        ticketRepository.setTicketsToBacklog(ticketStatus.getId(),iterationId);

    }

    private IterationResponse entityToDto(Iteration iteration)
    {
        IterationResponse iterationResponse = new IterationResponse();
        iterationResponse.setDescription(iteration.getDescription());
        iterationResponse.setEndDate(iteration.getEndDate());
        iterationResponse.setStartDate(iteration.getStartDate());
        iterationResponse.setName(iteration.getName());
        iterationResponse.setProjectId(iteration.getProject().getId());
        iterationResponse.setStatus(iteration.getStatus());

        return  iterationResponse;
    }
}
