package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Ticket;
import ba.unsa.pmf.pragma.service.TicketService;
import ba.unsa.pmf.pragma.service.dtos.CreateTicketRequest;
import ba.unsa.pmf.pragma.service.dtos.TicketResponse;
import ba.unsa.pmf.pragma.service.dtos.NameAndDescription;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

    @Autowired
    TicketService ticketService;

    @PostMapping("create")
    public TicketResponse create(@RequestBody CreateTicketRequest request) throws NotFoundException {
        return  ticketService.create(request);
    }

    @GetMapping("details/{ticketId}")
    public TicketResponse  getTicket(@PathVariable Long ticketId) throws NotFoundException {
        return ticketService.getTicket(ticketId);
    }

    @PutMapping("{ticketId}/update-ticket-type/{ticketTypeId}")
    public void changeTypeOfTicket(@PathVariable Long ticketId, @PathVariable Short ticketTypeId) throws  NotFoundException {
        ticketService.changeTypeOfTicket(ticketId,ticketTypeId);
    }

    @PutMapping("{ticketId}/update-status/{statusId}")
    public void changeStatusOfTicket(@PathVariable Long ticketId, @PathVariable Short statusId) throws  NotFoundException {
        ticketService.changeStatusOfTicket(ticketId,statusId);
    }

    @PutMapping("{ticketId}/update-name-and-description")
    public  void editNameAndDescription(@PathVariable Long ticketId, @RequestBody NameAndDescription request) throws  NotFoundException{
        ticketService.editNameAndDescription(ticketId,request);
    }

    @PutMapping("{ticketId}/assign-user/{userId}")
    public void assignUserToTask(@PathVariable Long ticketId, @PathVariable Long userId) throws  NotFoundException {
        ticketService.assignUserToTask(ticketId,userId);
    }

    @GetMapping("{iterationId}/{ticketType}")
    public List<Ticket> findTicketsByType(@PathVariable Long iterationId, @PathVariable String ticketType){
        return ticketService.findTicketsByType(iterationId, ticketType);
    }
}
