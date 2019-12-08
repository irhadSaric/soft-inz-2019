import Application from "../../Application";
import { IUserService } from "../../service/user/UserService";
import TeamPresenter, {
  ITeamPresenter
} from "../../presenter/team/TeamPresenter";
import { IUser } from "../../model/user/User";
import { ICredentialsService } from "../../service/authentication/CredentialsService";
import { ICodebookService } from "../../service/codebook/CodebookService";

export default class ShowTeamInteractor {
  private application: Application;
  private output?: ITeamPresenter;
  private userService: IUserService;
  private credentialsService: ICredentialsService;
  private codebookService: ICodebookService;

  constructor({
    application,
    userService,
    credentialsService,
    codebookService
  }: any) {
    this.application = application;
    this.userService = userService;
    this.credentialsService = credentialsService;
    this.codebookService = codebookService;
  }

  execute() {
    this.output = TeamPresenter({
      application: this.application,
      initialState: {
        userProfile: {} as IUser,
        countries: [],
        isEditableForm: false,
        editButtonDisabled: false,
        projectDescription: ""
      }
    });

    this.credentialsService.getEmailFromStorage().then(email => {
      email &&
        this.userService
          .getUserByEmail(email)
          .then(this.output && this.output.loadUserProfile);
    });

    this.codebookService
      .getCountries()
      .then(this.output && this.output.loadCountries);

    return this.output;
  }
}
