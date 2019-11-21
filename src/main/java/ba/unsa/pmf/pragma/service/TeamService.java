package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.entity.UserTeam;
import ba.unsa.pmf.pragma.db.repository.TeamRepository;
import ba.unsa.pmf.pragma.db.repository.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserTeamRepository userTeamRepository;

    @Transactional(readOnly = true)
    public List<Team> findAllTeams() {
//      TODO, If user has permission
        return teamRepository.findAll();
    }

    @Transactional
    public Team findTeamById(Long id){
        return teamRepository.getOne(id);
    }

    @Transactional
    public String saveTeam(Team team){
        teamRepository.save(team);
        return ":redirect/api/team/find/"+team.getId().toString();
    }

    @Transactional
    public List<User> findTeamMembers(Long teamId){
        return teamRepository.findTeamMembers(teamId);
    }

    @Transactional
    public String saveUserTeam(UserTeam userTeam){
        userTeamRepository.save(userTeam);
        return ":redirect/api/team/find/"+userTeam.getTeam().getId().toString();
    }
}
