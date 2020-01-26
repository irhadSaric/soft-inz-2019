package ba.unsa.pmf.pragma.common.authorization;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author malek.chahin
 * January, 25, 2020.
 */
@Service
public class AuthorizationService {

    @Autowired
    private TeamRepository teamRepository;

    @Transactional(readOnly = true)
    public boolean isTeamLead(Long userId, Long teamId) {
        if (userId == null || teamId == null) {
            return false;
        }
        List<Team> teams = teamRepository.getTeamByUserAndRoleKeyAndStatusKey(userId, "team-lead", "active-team-member");
        return teams.stream().anyMatch(team -> team.getId().equals(teamId));
    }
}
