package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.*;
import ba.unsa.pmf.pragma.db.repository.*;
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

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private UserTeamService userTeamService;

    @Transactional
    public List<Team> getAll(){
        return teamRepository.findAll();
    }

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
            throw new NotFoundException(String.format("User with %d id not found.", request.getUserId()));
        }

        User user = optional.get();
        UserTeam userTeam = userTeamService.addUserToTeam(
                user,
                team,
                roleRepository.getRoleByKey("lead"),
                statusRepository.getStatusByKey("active-team-member"),
                request.getNickname()
        );

        return new UserTeamResponse(
                userTeam.getNickname(),
                userTeam.getRole().getName(),
                userTeam.getRole().getKey(),
                team.getName(),
                team.getDescription(),
                userTeam.getStatus()
        );
    }
}