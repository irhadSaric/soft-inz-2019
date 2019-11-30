import Application from "../../Application";
import RegistrationPresenter, {
  IRegistrationPresenter,
  TRegisterPresentationModel
} from "../../presenter/authentication/RegistrationPresenter";
import { ICodebookService } from "../../service/codebook/CodebookService";

export default class ShowRegistrationInteractor {
  private application: Application;
  private output?: IRegistrationPresenter;
  private codebookService: ICodebookService;

  constructor({ application, codebookService }: any) {
    this.application = application;
    this.codebookService = codebookService;
  }

  execute() {
    this.output = RegistrationPresenter({
      application: this.application,
      initialState: {
        registrationData: {} as TRegisterPresentationModel,
        countries: [],
        registerButtonDisabled: false
      }
    });
    this.codebookService
      .getCountries()
      .then(this.output && this.output.loadCountries);

    return this.output;
  }
}
