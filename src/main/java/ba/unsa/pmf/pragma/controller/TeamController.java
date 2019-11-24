package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.entity.UserTeam;
import ba.unsa.pmf.pragma.service.RoleService;
import ba.unsa.pmf.pragma.service.TeamService;
import ba.unsa.pmf.pragma.service.UserService;
import ba.unsa.pmf.pragma.service.UserTeamService;
import ba.unsa.pmf.pragma.service.dtos.CreateTeamRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/team/")
public class TeamController {
    @Autowired
    UserService userService;

    @Autowired
    TeamService teamService;

    @Autowired
    UserTeamService userTeamService;

    @Autowired
    RoleService roleService;

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

    @GetMapping("/find/all")
    public List<Team> findAll(){
        return teamService.findAll();
    }

    @GetMapping("/find/{teamId}")
    public List<User> findAllTeamMembers(@PathVariable("teamId") Long teamId) {
        return teamService.findTeamMembers(teamId);
    }

    @PostMapping("/add/{teamId}/{userId}/{roleId}")
    public String addUserToTeam(@PathVariable("teamId") Long teamId, @PathVariable("userId") Long userId,
                                @PathVariable short roleId){
        UserTeam userTeam = new UserTeam();
        User user = userService.getUser(userId);

        userTeam.setJoinDate(new Date());
        userTeam.setNickname(user.getFirstName());
        userTeam.setUser(user);
        userTeam.setTeam(teamService.findTeamById(teamId));
        userTeam.setRole(roleService.getRoleById(roleId));
        return teamService.saveUserTeam(userTeam);
    }

}
