package ba.unsa.pmf.pragma.service;

import ba.unsa.pmf.pragma.db.entity.Team;
import ba.unsa.pmf.pragma.db.repository.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserTeamService {

    @Autowired
    private UserTeamRepository userTeamRepository;

    @Transactional(readOnly = true)
    public List<Team> getTeamsForUser(Long userId) {
      return userTeamRepository.getTeamsForUser(userId);
    }
}
