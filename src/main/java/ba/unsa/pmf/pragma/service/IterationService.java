package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Iteration;
import ba.unsa.pmf.pragma.db.entity.Project;
import ba.unsa.pmf.pragma.db.entity.Status;
import ba.unsa.pmf.pragma.db.repository.IterationRepository;
import ba.unsa.pmf.pragma.db.repository.ProjectRepository;
import ba.unsa.pmf.pragma.db.repository.StatusRepository;
import ba.unsa.pmf.pragma.service.dtos.CreateIterationRequest;
import ba.unsa.pmf.pragma.service.dtos.CreateIterationResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public CreateIterationResponse createIteration(CreateIterationRequest createIterationRequest) throws NotFoundException {
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

        iterationRepository.save(iteration);

        CreateIterationResponse createIterationResponse = new CreateIterationResponse();
        createIterationResponse.setDescription(iteration.getDescription());
        createIterationResponse.setEndDate(iteration.getEndDate());
        createIterationResponse.setStartDate(iteration.getStartDate());
        createIterationResponse.setName(iteration.getName());
        createIterationResponse.setProjectId(project.get().getId());
        createIterationResponse.setStatus(status);

        return createIterationResponse;
    }

    public Iteration getIteration(Long id) throws NotFoundException {
        Optional<Iteration> iteration = iterationRepository.findById(id);
        if(iteration.isEmpty()){
            throw new NotFoundException("Iteration not found");
        }

        return iteration.get();
    }

    public List<Iteration> findAll() {
        return iterationRepository.findAll();
    }
}
