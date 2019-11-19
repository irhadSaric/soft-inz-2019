package ba.unsa.pmf.pragma.db.keys;

import java.io.Serializable;

public class TeamProjectKey implements Serializable {

    private Long team;
    private Long project;

    public TeamProjectKey() {
    }

    public TeamProjectKey(Long team_id, Long project_id) {
        this.team = team_id;
        this.project = project_id;
    }
}
