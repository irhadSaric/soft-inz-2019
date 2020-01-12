import Application from "../../Application";
import IterationPresenter, {
  IIterationPresenter
} from "../../presenter/iteration/IterationPresenter";
import { IIterationService } from "../../service/iteration/IterationService";
import { IIteration } from "../../model/iteration/Iteration";

export default class ShowIterationInteractor {
  private application: Application;
  private output?: IIterationPresenter;
  private iterationService: IIterationService;

  constructor({ application, iterationService }: any) {
    this.application = application;
    this.iterationService = iterationService;
  }

  execute(iterationaId: number) {
    this.output = IterationPresenter({
      application: this.application,
      initialState: {
        iteration: {} as IIteration,
        iterationTickets: [],
        isEditableForm: false,
        editButtonDisabled: false
      }
    });

    this.iterationService
      .getAllIterations(iterationaId)
      .then(this.output && this.output.loadIterations);

    this.iterationService
      .getAllIterationTickets(iterationaId)
      .then(this.output && this.output.loadIterationTickets);

    return this.output;
  }
}
