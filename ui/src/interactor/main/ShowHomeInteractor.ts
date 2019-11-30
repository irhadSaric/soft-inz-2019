import Application from "../../Application";
import HomePresenter, {
  IHomePresenter
} from "../../presenter/main/HomePresenter";

export default class ShowHomeInteractor {
  private application: Application;
  private output?: IHomePresenter;

  constructor({ application }: any) {
    this.application = application;
  }

  execute() {
    this.output = HomePresenter({
      application: this.application,

      initialState: {}
    });

    return this.output;
  }
}
