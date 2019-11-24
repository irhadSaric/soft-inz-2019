package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.entity.User;
import ba.unsa.pmf.pragma.db.entity.UserTeam;
import ba.unsa.pmf.pragma.db.repository.RoleRepository;
import ba.unsa.pmf.pragma.db.repository.TeamRepository;
import ba.unsa.pmf.pragma.db.repository.UserRepository;
import ba.unsa.pmf.pragma.db.repository.UserTeamRepository;
import ba.unsa.pmf.pragma.service.dtos.CreateTeamRequest;
import ba.unsa.pmf.pragma.service.dtos.UserTeamResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserTeamRepository userTeamRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public UserTeamResponse createTeam(CreateTeamRequest request) throws NotFoundException {

        Team team = new Team();
        team.setCreationDate(new Date(System.currentTimeMillis()));
//        team.setLogo(request.getLogo());
        team.setName(request.getTeamName());
        team.setDescription(request.getDescription());
        team = teamRepository.save(team);

        Optional<User> optional = userRepository.findById(request.getUserId());

        if (optional.isEmpty()) {
            throw new NotFoundException(String.format("User with %s id not found.", request.getUserId()));
        }

        User user = optional.get();
        UserTeam userTeam = new UserTeam();
        userTeam.setUser(user);
        userTeam.setJoinDate(new Date(System.currentTimeMillis()));
        userTeam.setTeam(team);
        userTeam.setRole(roleRepository.getRoleByKey("lead"));
        userTeam.setNickname(
                (request.getNickname() == null || request.getNickname().equals("")) ?
                user.getFirstName() + user.getLastName() :
                request.getNickname()
        );
        userTeamRepository.save(userTeam);

        return new UserTeamResponse(
                userTeam.getNickname(),
                userTeam.getRole().getName(),
                userTeam.getRole().getKey(),
                team.getName(),
                team.getDescription()
        );
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