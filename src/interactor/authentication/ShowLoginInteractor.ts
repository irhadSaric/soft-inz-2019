import Application from "../../Application";
import LoginPresenter, {
  ILoginPresenter
} from "../../presenter/authentication/LoginPresenter";

export default class ShowLoginInteractor {
  private application: Application;
  private output?: ILoginPresenter;

  constructor({ application }: any) {
    this.application = application;
  }

  execute(email?: string) {
    this.output = LoginPresenter({
      application: this.application,
      initialState: {
        email: email || "",
        password: "",
        loginButtonDisabled: true
      }
    });

    return this.output;
  }
}
