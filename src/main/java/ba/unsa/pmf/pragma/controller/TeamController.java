package ba.unsa.pmf.pragma.controller;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.service.TeamService;
import ba.unsa.pmf.pragma.service.UserTeamService;
import ba.unsa.pmf.pragma.service.dtos.*;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.List;

@PreAuthorize("isAuthenticated()")
@RestController
@RequestMapping("/api/teams")
public class TeamController extends BaseController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private UserTeamService userTeamService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public List<Team> getAll(){
        return teamService.getAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PostMapping("/create-team")
    public UserTeamResponse createTeam(@RequestBody CreateTeamRequest request) throws NotFoundException {
        return teamService.createTeam(request);
    }

    // todo: create security method to only permit requests for users with the userId (parameter) which corresponds
    // to the user sending the request (ideas: check if the user with the provided userId has same credentials as the
    // user sending the request)
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

    @PreAuthorize("@authorizationService.isTeamLead(#request.userId, #request.teamId)")
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

    @PostMapping("/{id}/upload")
    public void changeLogo(@RequestBody MultipartFile file, @PathVariable Long id) throws NotFoundException, IOException {
        teamService.uploadLogo(id, file);
    }

    @GetMapping("/{id}/logo")
    public byte[] getLogo(@PathVariable Long id) throws NotFoundException {
        return teamService.getLogo(id);
    }

    @GetMapping("/{teamId}/details")
    public TeamWithoutLogo getTeamDetails(@PathVariable Long teamId) throws NotFoundException {
        return  teamService.getTeamDetails(teamId);
    }

    @PutMapping("/{teamId}/edit")
    public void editTeamDetails(@RequestBody TeamWithoutLogo teamDetails, @PathVariable Long teamId) throws NotFoundException {
        teamService.editTeamDetails(teamId,teamDetails);
    }

    @DeleteMapping("/delete/{teamId}")
    public void deleteTeam(@PathVariable Long teamId) throws NotFoundException {
        teamService.deleteTeam(teamId);
    }

    @DeleteMapping("/leave/{teamId}/{userId}")
    public void leaveTeam(@PathVariable Long teamId, @PathVariable Long userId) throws NotFoundException {
        teamService.leaveTeam(teamId, userId);
    }
}
