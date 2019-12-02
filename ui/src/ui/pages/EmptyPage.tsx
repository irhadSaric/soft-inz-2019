import React from "react";
import Page, { PageProps } from "./Page";
export interface Props extends PageProps {}
export interface State {}

export default class EmptyPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { title, text } = this.state as any;

    return (
      <Page
        {...this.props}
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: "100%"
        }}
      >
        <div className="mik-main-content">
          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                <h3
                  style={{ fontSize: 30, color: "#8D8D8D", fontWeight: "bold" }}
                >
                  {title}
                </h3>
              </div>
              <div className="card-header-actions">Actions</div>
            </div>
            <div className="card-body">{text && <span>{text}</span>}</div>
          </div>
        </div>
      </Page>
    );
  }
}
