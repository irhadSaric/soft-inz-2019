package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Iteration;
import ba.unsa.pmf.pragma.db.entity.Project;
import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.repository.ProjectRepository;
import ba.unsa.pmf.pragma.db.repository.StatusRepository;
import ba.unsa.pmf.pragma.db.repository.TeamRepository;
import ba.unsa.pmf.pragma.service.dtos.CreateProjectRequest;
import ba.unsa.pmf.pragma.service.dtos.CreateProjectResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Transactional
    public Project getProject(Long id) throws NotFoundException {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()){
            throw new NotFoundException("Project not found");
        }
        return project.get();
    }

    @Transactional
    public CreateProjectResponse createProject(CreateProjectRequest createProjectRequest) throws NotFoundException {
        Project project = new Project();
        project.setDescription(createProjectRequest.getDescription());
        project.setEndDate(createProjectRequest.getEndDate());
        project.setName(createProjectRequest.getName());
        project.setStartDate(new Date(System.currentTimeMillis()));

        Optional<Team> team = teamRepository.findById(createProjectRequest.getTeamId());
        if (team.isEmpty()){
            throw new NotFoundException("Team not found");
        }
        project.setTeam(team.get());
        project.setStatusId(statusRepository.getStatusByKey("active-project"));

        projectRepository.save(project);
        CreateProjectResponse createProjectResponse = new CreateProjectResponse();
        createProjectResponse.setDescription(project.getDescription());
        createProjectResponse.setEndDate(project.getEndDate());
        createProjectResponse.setStartDate(project.getStartDate());
        createProjectResponse.setName(project.getName());
        createProjectResponse.setStatusId(project.getStatusId());
        createProjectResponse.setTeamId(team.get().getId());

        return createProjectResponse;
    }

    @Transactional
    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    @Transactional
    public List<Iteration> getAllIterationsForProject(Long id) {
        return projectRepository.getAllIterationsForProject(id);
    }

    @Transactional
    public Project editProject(Long id, CreateProjectRequest request) throws NotFoundException {
        Optional<Project> data = projectRepository.findById(id);
        if (data.isEmpty()){
            throw new NotFoundException("Project not found");
        }

        Project project = data.get();
        project.setStatusId(request.getStatus());
        project.setEndDate(request.getEndDate());
        project.setName(request.getName());
        project.setDescription(request.getDescription());

        Optional<Team> team = teamRepository.findById(request.getTeamId());
        if (team.isEmpty()){
            throw new NotFoundException("Team not found");
        }
        project.setTeam(team.get());
        projectRepository.save(project);
        return project;
    }

    @Transactional
    public List<Project> getAllProjectsForTeam(Long id) {
        return projectRepository.getAllByTeamId(id);
    }
}
