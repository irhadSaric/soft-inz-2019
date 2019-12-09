package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Iteration;
import ba.unsa.pmf.pragma.service.IterationService;
import ba.unsa.pmf.pragma.service.dtos.CreateIterationRequest;
import ba.unsa.pmf.pragma.service.dtos.CreateIterationResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/iteration")
public class IterationController {
    @Autowired
    private IterationService iterationService;

    @PostMapping("/create")
    public CreateIterationResponse createIteration(@RequestBody CreateIterationRequest createIterationRequest) throws NotFoundException {
        return iterationService.createIteration(createIterationRequest);
    }

    @GetMapping("/get/{id}")
    public Iteration getIteration(@PathVariable("id") Long id) throws NotFoundException {
        return iterationService.getIteration(id);
    }
}
