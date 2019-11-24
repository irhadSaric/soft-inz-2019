package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.service.TeamService;
import ba.unsa.pmf.pragma.service.UserTeamService;
import ba.unsa.pmf.pragma.service.dtos.CreateTeamRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeamController {

    @Autowired
    TeamService teamService;

    @Autowired
    UserTeamService userTeamService;

    @PostMapping("/create-team")
    public String createTeam(@RequestBody CreateTeamRequest request)
    {
        return teamService.createTeam(request);
    }

    @GetMapping("/get-teams/{user_id}")
    public List<Team> getTeamsForUser(@PathVariable final Long user_id)
    {
         return userTeamService.getTeamsForUser(user_id);
    }

}
