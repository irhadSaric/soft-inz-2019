package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.entity.UserTeam;
import ba.unsa.pmf.pragma.db.repository.RoleRepository;
import ba.unsa.pmf.pragma.service.TeamService;
import ba.unsa.pmf.pragma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/team/")
public class TeamController extends BaseController {
    @Autowired
    private TeamService teamService;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/find/all")
    public List<Team> returnTeams(){
        return teamService.findAllTeams();
    }

    @PostMapping("/add")
    public String addTeam(@Valid @RequestBody Team team){
        team.setCreationDate(new Date());
        return teamService.saveTeam(team);
    }

    @GetMapping("/find/{teamId}")
    public List<User> findAllTeamMembers(@PathVariable("teamId") Long teamId) {
        return teamService.findTeamMembers(teamId);
    }

    @PostMapping("/add/{teamId}/{userId}")
    public String addUserToTeam(@PathVariable("teamId") Long teamId, @PathVariable("userId") Long userId){
        UserTeam userTeam = new UserTeam();
        User user = userService.getUser(userId);

        userTeam.setJoinDate(new Date());
        userTeam.setNickname(user.getFirstName());
        userTeam.setUser(user);
        userTeam.setTeam(teamService.findTeamById(teamId));
        userTeam.setRole(roleRepository.getOne((short) 1));
        return teamService.saveUserTeam(userTeam);
    }
}
