package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.*;
import ba.unsa.pmf.pragma.db.repository.*;
import ba.unsa.pmf.pragma.service.dtos.CreateTeamRequest;
import ba.unsa.pmf.pragma.service.dtos.TeamWithoutLogo;
import ba.unsa.pmf.pragma.service.dtos.UserProfileData;
import ba.unsa.pmf.pragma.service.dtos.UserTeamResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
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

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private IterationRepository iterationRepository;

    @Autowired
    private TicketRepository ticketRepository;

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
                userTeam.getStatus(),
                team.getId());
    }

    @Transactional
    public void uploadLogo(Long id, MultipartFile file) throws NotFoundException, IOException {
        Optional<Team> data = teamRepository.findById(id);

        if (data.isEmpty()){
            throw new NotFoundException("Team not found.");
        }
        else{
            Team team = data.get();
            try {
                String fileName = file.getOriginalFilename();

                if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")){
                    team.setLogo(file.getBytes());
                    teamRepository.save(team);
                }
                else{
                    throw new UnsupportedOperationException("Allowed formats: .jpg .jpeg .png");
                }
            } catch (IOException e) {
                throw new IOException("Uploading file failed.");//e.printStackTrace();
            }
        }
    }

    public byte[] getLogo(Long id) throws NotFoundException {
        Optional<Team> data = teamRepository.findById(id);

        if (data.isEmpty()){
            throw new NotFoundException("Team not found.");
        }

        Team team = data.get();
        return team.getLogo();
    }

    public TeamWithoutLogo getTeamDetails(Long id) throws  NotFoundException {
        Optional<Team> data = teamRepository.findById(id);
        if (data.isEmpty()){
            throw new NotFoundException("Team not found.");
        }
        Team team = data.get();
         return  new TeamWithoutLogo(team.getId(),team.getName(),team.getDescription(),team.getCreationDate(),team.getLastUpdated());
    }

    public  void editTeamDetails(Long id, TeamWithoutLogo teamDetails) throws  NotFoundException  {
        Optional<Team> data = teamRepository.findById(id);
        if (data.isEmpty()){
            throw new NotFoundException("Team not found.");
        }
        Team team = data.get();
        team.setDescription(teamDetails.getDescription());
        team.setName(teamDetails.getName());
        teamRepository.save(team);
    }

    @Transactional
    public void deleteTeam(Long id) throws NotFoundException {
        // Treba provjeriti da li je user leader, kako ?
        Optional<Team> data = teamRepository.findById(id);
        if (data.isEmpty()){
            throw new NotFoundException("Team not found");
        }
        Team team = data.get();
        List<UserTeam> userTeams = userTeamRepository.getByTeamId(team.getId());
        for (UserTeam userTeam : userTeams){
            userTeamRepository.delete(userTeam);
        }

        List<Project> teamProjects = projectRepository.getAllByTeamId(team.getId());
        for(Project project : teamProjects){
            List<Iteration> projectIterations = iterationRepository.getAllByProjectId(project.getId());
            for(Iteration iteration : projectIterations){
                List<Ticket> iterationTickets = ticketRepository.getTicketsForIteration(iteration.getId());
                for(Ticket ticket : iterationTickets){
                    ticketRepository.delete(ticket);
                }
                iterationRepository.delete(iteration);
            }
            projectRepository.delete(project);
        }
        teamRepository.delete(team);
    }

    @Transactional
    public void leaveTeam(Long teamId, Long userId) throws NotFoundException {
        // provjeriti slucaj kada u timu postoji samo 1 clan i slucaj kada lider izlazi iz tima

        Optional<Team> data = teamRepository.findById(teamId);
        if (data.isEmpty()){
            throw new NotFoundException("Team not found");
        }
        Optional<User> userData = userRepository.findById(userId);
        if (userData.isEmpty()){
            throw new NotFoundException("User not found");
        }
        UserTeam userTeam = userTeamRepository.getByTeamIdAndUserId(teamId, userId);
        if(userTeam == null){
            throw new NotFoundException("User is not team member");
        }
        userTeamRepository.delete(userTeam);
    }
}
