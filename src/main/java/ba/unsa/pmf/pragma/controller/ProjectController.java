package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Iteration;
import ba.unsa.pmf.pragma.db.entity.Project;
import ba.unsa.pmf.pragma.service.ProjectService;
import ba.unsa.pmf.pragma.service.dtos.CreateProjectRequest;
import ba.unsa.pmf.pragma.service.dtos.CreateProjectResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping("/all")
    public List<Project> getAll(){
        return projectService.getAll();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable("id") Long id) throws NotFoundException {
        return projectService.getProject(id);
    }

    @PutMapping("/edit/{id}")
    public Project editProject(@PathVariable("id") Long id, @RequestBody CreateProjectRequest request) throws NotFoundException {
        return projectService.editProject(id, request);
    }

    @PostMapping("/create")
    public CreateProjectResponse createProject(@RequestBody CreateProjectRequest createProjectRequest) throws NotFoundException {
        return projectService.createProject(createProjectRequest);
    }

    @GetMapping("/iterations/{id}")
    public List<Iteration> getIterationsForProject(@PathVariable("id") Long id){
        return projectService.getAllIterationsForProject(id);
    }

    @GetMapping("/iterations/{id}/active")
    public Iteration getActiveIterationForProject(@PathVariable("id") Long id){
        return projectService.getActiveIterationForProject(id);
    }

    @GetMapping("/iterations/{id}/archived")
    public List<Iteration> getArchivedIterationsForProject(@PathVariable("id") Long id){
        return projectService.getAllIterationsByType(id, "archived-iteration");
    }

    @GetMapping("/iterations/{id}/completed")
    public List<Iteration> getCompletedIterationsForProject(@PathVariable("id") Long id){
        return projectService.getAllIterationsByType(id, "completed-iteration");
    }

    @GetMapping("/team/{id}")
    public List<Project> getAllProjectsForTeam(@PathVariable("id") Long id){
        return projectService.getAllProjectsForTeam(id);
    }


}
