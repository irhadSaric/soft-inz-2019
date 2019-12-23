package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.*;
import ba.unsa.pmf.pragma.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author malek.chahin
 * November, 24, 2019.
 */
@RestController
@RequestMapping("/api/codebooks")
public class CodebooksController {

    @Autowired
    private CountryService countryService;

    @Autowired
    private StatusService statusService;

    @Autowired
    private StatusTypeService statusTypeService;

    @Autowired
    private TicketTypeService ticketTypeService;

    @Autowired
    private UserTeamService userTeamService;

    @GetMapping("/countries/all")
    public List<Country> getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/statuses/all")
    public List<Status> getAllStatuses() {
        return statusService.getAllStatuses();
    }

    @GetMapping("/statusTypes/all")
    public List<StatusType> getAllStatusTypes() { return statusTypeService.getAllStatusTypes(); }

    @GetMapping("/ticket-types/all")
    public List<TicketType> getAllTicketTypes() {return  ticketTypeService.getAllTicketTypes();}

    @GetMapping("/user-team/all")
    public List<UserTeam> getAllUserTeam(){
        return userTeamService.getAll();
    }
}
