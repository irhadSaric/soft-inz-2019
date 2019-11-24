package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.service.TeamService;
import ba.unsa.pmf.pragma.service.UserTeamService;
import ba.unsa.pmf.pragma.service.dtos.CreateTeamRequest;
import ba.unsa.pmf.pragma.service.dtos.UserTeamResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserTeamService userTeamService;

    @PostMapping("/create-team")
    public UserTeamResponse createTeam(@RequestBody CreateTeamRequest request) throws NotFoundException {
        return teamService.createTeam(request);
    }

    @GetMapping("/get-teams/{userId}")
    public List<Team> getTeamsForUser(@PathVariable final Long userId) {
         return userTeamService.getTeamsForUser(userId);
    }
}
