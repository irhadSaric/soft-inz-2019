package ba.unsa.pmf.pragma.db.entity;

import ba.unsa.pmf.pragma.db.keys.TeamProjectKey;

import javax.persistence.*;

@Entity
@Table(name = "team_projects")
@IdClass(TeamProjectKey.class)
public class TeamProject {

    @Id
    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @Id
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
