package ba.unsa.pmf.pragma.controller;


import ba.unsa.pmf.pragma.db.entity.Iteration;
import ba.unsa.pmf.pragma.service.IterationService;
import ba.unsa.pmf.pragma.service.dtos.CreateIterationRequest;
import ba.unsa.pmf.pragma.service.dtos.IterationResponse;
import ba.unsa.pmf.pragma.service.dtos.TicketResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/iteration")
public class IterationController {
    @Autowired
    private IterationService iterationService;

    @PostMapping("/create")
    public IterationResponse createIteration(@RequestBody CreateIterationRequest createIterationRequest) throws NotFoundException {
        return iterationService.createIteration(createIterationRequest);
    }

    @GetMapping("/get/{id}")
    public IterationResponse getIteration(@PathVariable("id") Long id) throws NotFoundException {
        return iterationService.getIteration(id);
    }

    @GetMapping("/get/all")
    public List<IterationResponse> findAll(){
        return iterationService.findAll();
    }

    @GetMapping("{iterationId}/tickets")
    public List<TicketResponse> getAllIterationTickets(@PathVariable Long iterationId){
        return iterationService.getAllIterationTickets(iterationId);
    }

    @PutMapping("{iterationId}/finish-iteration")
    public void finishIteration(@PathVariable Long iterationId) throws NotFoundException{
        iterationService.finishIteration(iterationId);
    }

}
