import React from "react";
import Page, { PageProps } from "../Page";
import IterationForm from "./IterationForm";
import { IIterationPresenter } from "../../../presenter/iteration/IterationPresenter";

export interface Props extends PageProps {}
export interface State extends IIterationPresenter {}

export default class IterationPage extends React.Component<Props, State> {
  private subscriptionId: number = 0;

  constructor(props: any) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    this.subscriptionId = this.state.store.subscribe(result => {
      return this.setState(prevState => result);
    });
  }

  componentWillUnmount() {
    this.state.store.unsubscribe(this.subscriptionId);
  }

  render() {
    const {
      translate,
      iteration,
      iterationTickets,
      isEditableForm,
      editValidationErrors,
    } = this.state;
    return (
      <Page
        {...this.props}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <IterationForm
          translate={translate}
          iteration={iteration}
          iterationTickets={iterationTickets}
          isEditable={isEditableForm}
          validationErrors={editValidationErrors}
        />
      </Page>
    );
  }
}
