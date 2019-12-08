package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.*;
import ba.unsa.pmf.pragma.db.repository.*;
import ba.unsa.pmf.pragma.service.dtos.TeamInviteRequest;
import ba.unsa.pmf.pragma.service.dtos.TeamInviteResponse;
import ba.unsa.pmf.pragma.service.dtos.UserTeamResponse;
import com.sun.istack.Nullable;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserTeamService {

    @Autowired
    private UserTeamRepository userTeamRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Transactional(readOnly = true)
    public List<Team>
    getTeamsForUser(@NotNull Long userId) {
      return userTeamRepository.getTeamsForUser(userId);
    }

    @Transactional(readOnly = true)
    public List<TeamInviteResponse>
    getActiveTeamsForUser(@NotNull Long userId) {
        return userTeamRepository.getUserTeamResponseForUserByStatusKey(userId, "active-team-member");
    }

    @Transactional(readOnly = true)
    public List<TeamInviteResponse>
    getTeamInvitesForUser(@NotNull Long userId) {
        return userTeamRepository.getUserTeamResponseForUserByStatusKey(userId, "pending-team-member");
    }

    @Transactional
    public TeamInviteResponse
    inviteUserToTeam(@NotNull TeamInviteRequest request)
    throws NotFoundException {

        if (
            teamRepository.getTeamByUserAndRoleKeyAndStatusKey(request.getUserId(), "lead", "active-team-member").
            stream().noneMatch(team -> team.getId().equals(request.getTeamId()))
        ) {
            // If the requested UserTeam combination with lead role does not exist
            // FIXME: replace with unauthorized exceptions
            throw new NotFoundException(String.format("Provided user %d is not lead of team %d.", request.getUserId(), request.getTeamId()));
        }
        Optional<User> obj = userRepository.findById(request.getInvitedUserId());
        if (obj.isEmpty()) {
            throw new NotFoundException(String.format("No user with id %d found.", request.getInvitedUserId()));
        }
        // We know these exist because of the condition checks above
        Team team = teamRepository.findById(request.getTeamId()).get();
        User invitedUser = obj.get();
        Role role = roleRepository.getRoleByKey("member");
        Status status = statusRepository.getStatusByKey("pending-team-member");

        addUserToTeam(invitedUser, team, role, status, null);
        return new TeamInviteResponse(invitedUser.getId(), team.getId(), team.getName(), role.getName(), role.getKey(), status);
    }

    @Transactional
    public UserTeam
    addUserToTeam(@NotNull User user, @NotNull Team team, @NotNull Role role, @NotNull Status status, @Nullable String nickname) {
        UserTeam userTeam = new UserTeam();
        userTeam.setUser(user);
        // Current timestamp for the joined date
        userTeam.setJoinDate(new Date(System.currentTimeMillis()));
        userTeam.setTeam(team);
        userTeam.setRole(role);
        // If no nickname is provided or it is empty a combination of the user first and last name is used
        userTeam.setNickname(StringUtils.isEmpty(nickname) ? user.getFirstName() + user.getLastName() : nickname);
        userTeam.setStatus(status);
        // Inserts new record to the user_teams table
        return userTeamRepository.save(userTeam);
    }

    @Transactional(readOnly = true)
    public List<User>
    getActiveTeamMembers(@NotNull Long teamId) {
        return userRepository.getUsersByTeamAndStatusKey(teamId, "active-team-member");
    }

    @Transactional(readOnly = true)
    public List<User>
    getPendingTeamMembers(@NotNull Long teamId) {
        return userRepository.getUsersByTeamAndStatusKey(teamId, "pending-team-member");
    }

    @Transactional
    public UserTeamResponse
    respondToPendingInvite(@NotNull Long userId, @NotNull Long teamId, @NotNull Boolean accept)
    throws NotFoundException {

        List<UserTeam> userTeams = userTeamRepository.getByUserIdAndTeamIdAndKey(userId, teamId, "pending-team-member");

        if (userTeams.size() == 0) {
            throw new NotFoundException(String.format("User %d has no invites from team %d", userId, teamId));
        }

        String keyToSet = (accept) ? "active-team-member" : "rejected-team-invite";
        Status status = statusRepository.getStatusByKey(keyToSet);

        // Due to the db pk constraint on the user_teams table it won't be possible to have multiple records
        UserTeam userTeam = userTeams.get(0);
        userTeam.setStatus(status);
        userTeamRepository.save(userTeam);

        // Create and return response
        return new UserTeamResponse(
            userTeam.getNickname(),
            userTeam.getRole().getName(),
            userTeam.getRole().getKey(),
            userTeam.getTeam().getName(),
            userTeam.getTeam().getDescription(),
            userTeam.getStatus(),
                teamId
        );
    }
}
