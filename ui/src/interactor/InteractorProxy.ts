import Application from "../Application";

export default class InteractorProxy {
  private interactor: any;
  private application: Application;
  constructor({
    interactor,
    application
  }: {
    interactor: any;
    application: Application;
  }) {
    this.interactor = interactor;
    this.application = application;
  }

  public execute(...args) {
    var interactionResult = this.interactor.execute(...args);
    if (interactionResult && interactionResult.then) {
      return interactionResult
        .then(result => {
          return result;
        })
        .catch(error => {
          return this.application.onApplicationError(error);
        });
    } else {
      return interactionResult;
    }
  }
}
