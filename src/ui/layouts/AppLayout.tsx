import React from "react";
import RootLayout from "./RootLayout";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { TTranslate } from "../../service/locale/TranslationService";
import { TPresentable } from "../../presenter/withStore";
import BreadCrumbComponent from "../components/app/BreadCrumbComponent";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export interface Props {
  router: any;
  children?: any;
  translate: TTranslate;
}

export interface State extends TPresentable {
  collapsed: boolean;
}

export default class BaseLayout extends React.Component<Props, State> {
  private subscriptionId: number = 0;
  constructor(props) {
    super(props);
    this.state = { ...props };
    this.setState({ collapsed: false });
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    this.subscriptionId = this.state.store.subscribe(result => {
      return this.setState(prevState => result);
    });
  }

  componentWillUnmount() {
    this.state.store.unsubscribe(this.subscriptionId);
  }

  render() {
    const { children, translate, router } = this.props;

    const { userEmail } = this.state as any;

    console.log(router);

    const redirect = path => {
      router.push({
        pathname: path
      });
    };

    return (
      <RootLayout {...this.props}>
        <div className="base_layout">
          <Layout style={{ minHeight: "100vh" }}>
            <Header className="header">
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key="1" style={{ float: "left" }}>
                  nav 1
                </Menu.Item>
                <Menu.Item key="2" style={{ float: "left" }}>
                  nav 2
                </Menu.Item>
                <Menu.Item key="3" style={{ float: "left" }}>
                  nav 3
                </Menu.Item>

                <SubMenu
                  style={{ float: "right" }}
                  title={
                    <span>
                      <Icon type="user" />
                      {userEmail}
                    </span>
                  }
                >
                  <Menu.Item key="setting:1">
                    <span>
                      <Icon type="setting" />
                      Settings
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    key="setting:2"
                    onClick={() => redirect("/dologout")}
                  >
                    <span>
                      <Icon type="logout" />
                      Logout
                    </span>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Header>
            <Layout>
              <Sider
                width={200}
                style={{ background: "#fff" }}
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  style={{ height: "100%", borderRight: 0 }}
                  defaultOpenKeys={["sub1"]}
                >
                  <Menu.Item key="1" onClick={() => redirect("/home")}>
                    <Icon type="pie-chart" />
                    <span>Dashboard</span>
                  </Menu.Item>
                  <Menu.Item key="3" onClick={() => redirect("/user/profile")}>
                    <Icon type="user" />
                    <span>User Profile</span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <BreadCrumbComponent router={router} translate={translate} />
                <Content
                  style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                  }}
                >
                  {children}
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  {`© ${new Date().getFullYear()} Pragma`}
                </Footer>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </RootLayout>
    );
  }
}
