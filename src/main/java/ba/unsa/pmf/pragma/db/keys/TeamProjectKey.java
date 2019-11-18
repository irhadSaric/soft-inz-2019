package ba.unsa.pmf.pragma.db.keys;

import java.io.Serializable;

public class TeamProjectKey implements Serializable {
    private Long teamId;
    private Long projectId;

    public TeamProjectKey() {
    }

    public TeamProjectKey(Long teamId, Long projectId) {
        this.teamId = teamId;
        this.projectId = projectId;
    }
}
