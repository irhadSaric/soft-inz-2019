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

  execute() {
    this.output = IterationPresenter({
      application: this.application,
      initialState: {
        iteration: {} as IIteration,
        isEditableForm: false,
        editButtonDisabled: false
      }
    });

    this.iterationService
      .getAllIterations(1)
      .then(this.output && this.output.loadIterations);

    return this.output;
  }
}
