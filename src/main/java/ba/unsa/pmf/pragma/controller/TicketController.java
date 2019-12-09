package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Ticket;
import ba.unsa.pmf.pragma.service.TicketService;
import ba.unsa.pmf.pragma.service.dtos.CreateTicketRequest;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

    @Autowired
    TicketService ticketService;

    //TODO automatski mapperi!?
    @PostMapping("create")
    public Ticket create(@RequestBody CreateTicketRequest request) throws NotFoundException {
        return  ticketService.create(request);
    }

}
