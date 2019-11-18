package ba.unsa.pmf.pragma.db.entity;

import ba.unsa.pmf.pragma.db.keys.TeamProjectKey;

import javax.persistence.*;

@Entity
@Table(name = "team_project")
@IdClass(TeamProjectKey.class)
public class TeamProject {
    @Id
    @Column(name = "team_id", nullable = false, insertable = false, updatable = false)
    private Long teamId;

    @Id
    @Column(name = "project_id", nullable = false, insertable = false, updatable = false)
    private Long projectId;

    @OneToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

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
