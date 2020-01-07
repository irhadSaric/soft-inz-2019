import { IIterationService } from "../../service/iteration/IterationService";

export default class CreateIterationInteractor {
  private iterationService: IIterationService;

  constructor({ iterationService }) {
    this.iterationService = iterationService;
  }

  async execute(
    description: string,
    endDate: Date,
    name: string,
    projectId: number
  ) {
    try {
      return this.iterationService.createIteration(
        description,
        endDate,
        name,
        projectId
      );
    } catch (error) {
      return error;
    }
  }
}
