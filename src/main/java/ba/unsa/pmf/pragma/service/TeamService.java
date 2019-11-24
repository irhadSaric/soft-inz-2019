package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.entity.UserTeam;
import ba.unsa.pmf.pragma.db.repository.RoleRepository;
import ba.unsa.pmf.pragma.db.repository.TeamRepository;
import ba.unsa.pmf.pragma.db.repository.UserRepository;
import ba.unsa.pmf.pragma.db.repository.UserTeamRepository;
import ba.unsa.pmf.pragma.service.dtos.CreateTeamRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    UserTeamRepository userTeamRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Transactional
    public String createTeam(CreateTeamRequest request) {
        Team team = new Team();
        team.setCreationDate(new Date(System.currentTimeMillis()));
        team.setLogo(request.getLogo());
        team.setName(request.getTeamName());
        team.setDescription(request.getDescription());

        team = teamRepository.save(team);

        Optional<User> optional = userRepository.findById(request.getUserId());
        UserTeam userTeam = new UserTeam();
        optional.ifPresent(user -> userTeam.setUser(optional.get()));
        userTeam.setJoinDate(new Date(System.currentTimeMillis()));
        userTeam.setTeam(team);
        userTeam.setRole(roleRepository.findRoleByKey("Lead"));
        userTeam.setNickname(request.getNickname());
        userTeamRepository.save(userTeam);
        return "Successfully Created Team";
    }

    @Transactional
    public Team findTeamById(Long id){
        return teamRepository.getOne(id);
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

    @Transactional
    public List<Team> findAll(){
        return teamRepository.findAll();
    }
}