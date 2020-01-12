import Application from "../../Application";
import IterationPresenter, {
  IIterationPresenter,
  TIterationPresentationModel
} from "../../presenter/iteration/IterationPresenter";
import { IIterationService } from "../../service/iteration/IterationService";

export default class ShowIterationInteractor {
  private application: Application;
  private output?: IIterationPresenter;
  private iterationService: IIterationService;

  constructor({ application, iterationService }: any) {
    this.application = application;
    this.iterationService = iterationService;
  }

  execute(iterationId: number) {
    this.output = IterationPresenter({
      application: this.application,
      initialState: {
        iteration: {} as TIterationPresentationModel,
        iterationTickets: [],
        isEditableForm: false,
        editButtonDisabled: false
      }
    });

    this.iterationService
      .getIterationById(iterationId)
      .then(this.output && this.output.loadIterations);

    this.iterationService
      .getAllIterationTickets(iterationId)
      .then(this.output && this.output.loadIterationTickets);

    return this.output;
  }
}
