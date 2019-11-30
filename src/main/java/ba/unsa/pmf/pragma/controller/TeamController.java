package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.service.TeamService;
import ba.unsa.pmf.pragma.service.UserTeamService;
import ba.unsa.pmf.pragma.service.dtos.CreateTeamRequest;
import ba.unsa.pmf.pragma.service.dtos.TeamInviteRequest;
import ba.unsa.pmf.pragma.service.dtos.TeamInviteResponse;
import ba.unsa.pmf.pragma.service.dtos.UserTeamResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserTeamService userTeamService;

    @GetMapping("/all")
    public List<Team> getAll(){
        return teamService.getAll();
    }

    @PostMapping("/create-team")
    public UserTeamResponse createTeam(@RequestBody CreateTeamRequest request) throws NotFoundException {
        return teamService.createTeam(request);
    }

    @GetMapping("/all/{userId}")
    public List<Team> getTeamsForUser(@PathVariable @NotNull Long userId) {
         return userTeamService.getTeamsForUser(userId);
    }

    @GetMapping("/active/{userId}")
    public List<TeamInviteResponse>
    getActiveTeamsForUser(@PathVariable @NotNull Long userId) {
        return userTeamService.getActiveTeamsForUser(userId);
    }

    @GetMapping("/pending/{userId}")
    public List<TeamInviteResponse>
    getTeamInvitesForUser(@PathVariable @NotNull Long userId) {
        return userTeamService.getTeamInvitesForUser(userId);
    }

    @PostMapping("/invite")
    public TeamInviteResponse
    inviteUserToTeam(@RequestBody @NotNull TeamInviteRequest request) throws NotFoundException {
        return userTeamService.inviteUserToTeam(request);
    }

    @GetMapping("/{teamId}/members/active")
    public List<User>
    getActiveTeamMembers(@PathVariable("teamId") @NotNull Long teamId) {
        return userTeamService.getActiveTeamMembers(teamId);
    }

    @GetMapping("/{teamId}/members/pending")
    public List<User>
    getPendingTeamMembers(@PathVariable("teamId") @NotNull Long teamId) {
        return userTeamService.getPendingTeamMembers(teamId);
    }

    @PostMapping("/pending/{userId}/respond/{teamId}")
    public UserTeamResponse
    respondToPendingInvite(
            @PathVariable("userId") @NotNull Long userId,
            @PathVariable("teamId") @NotNull Long teamId,
            @RequestParam(name = "accept") @NotNull Boolean accept
    ) throws NotFoundException {
        return userTeamService.respondToPendingInvite(userId, teamId, accept);
    }
}
