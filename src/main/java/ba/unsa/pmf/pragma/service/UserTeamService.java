package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.repository.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTeamService {

    @Autowired
    UserTeamRepository userTeamRepository;

    public List<Team> getTeamsForUser(Long user_id) {
      return userTeamRepository.getTeamsForUser(user_id);
    }
}
