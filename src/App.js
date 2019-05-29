import { Icon, Layout, Menu } from "antd";
import React, { Component } from "react";
import "./App.css";
import logo from "./logo.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InventoryContent from "./Inventory";
import ProjectsContent from "./Projects";
import HistoryContent from "./History";

const { Header, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    headertext: "Pathology Informatics - Inventory",
    loading: false
    // data: [],
    // page: "api/getInventory"
  };

  // componentDidMount(data) {
  //   axios.get("api/getInventory/").then(response => {
  //     this.setState({ data: response.data });
  //   });
  //   // console.log(this.state.data);
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component updating", prevProps, this.props);
    console.log("Component updating", prevState, this.state);
  }

  // displayResults(path, stateKey = "data") {
  //   axios.get(path).then(response => {
  //     this.setState({ [stateKey]: response.data });
  //   });
  //   console.log("displaying");
  // }

  // fetchdata = () => {
  //   this.setState({ loading: true });

  //   //Faking API call
  //   setTimeout(() => {
  //     this.setState({ loading: false });
  //   }, 2000);
  // };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
    console.log("toggle");
  };

  render() {
    return (
      <Router>
        <Layout className="layout">
          <Sider
            style={{ width: "100%" }}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo">
              <img src={logo} alt="logo" width="100%" />
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item
                key="1"
                onClick={() => {
                  return this.setState({
                    headertext: "Pathology Informatics - Inventory"
                  });
                }}
              >
                <Link to="/inventory/">
                  <Icon type="user" />
                  <span>Inventory</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="2"
                onClick={() => {
                  return this.setState({
                    headertext: "Pathology Informatics - Barcode Scan"
                  });
                }}
              >
                <Link to="/scan/">
                  <Icon type="video-camera" />
                  <span>Barcode Scan</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  return this.setState({
                    headertext: "Pathology Informatics - Projects"
                  });
                }}
              >
                <Link to="/projects/">
                  <Icon type="upload" />
                  <span>Projects</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => {
                  return this.setState({
                    headertext: "Pathology Informatics - History"
                  });
                }}
              >
                <Link to="/history/">
                  <Icon type="upload" />
                  <span>History</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="header"
              style={{
                background: "#002A52",
                padding: 0,
                marginLeft: 1
              }}
            >
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />{" "}
              {this.state.headertext}
            </Header>
            <div style={{ margin: "12px" }}>
              <Route path="/inventory/" component={InventoryContent} />
              <Route path="/projects/" component={ProjectsContent} />
              <Route path="/history/" component={HistoryContent} />
            </div>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
