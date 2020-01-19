import Application from "../../Application";
import IterationPresenter, {
  IIterationPresenter,
  TIterationPresentationModel
} from "../../presenter/iteration/IterationPresenter";
import { IIterationService } from "../../service/iteration/IterationService";
import { ITicket } from "../../model/ticket/Ticket";

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
        editButtonDisabled: false,
        isCreateTicketModalVisible: false,
        ticket: {} as ITicket,
        iterationId
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
