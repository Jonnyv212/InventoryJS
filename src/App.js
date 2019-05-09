//import { stringify } from "querystring";
import { Button, Icon, Layout, Menu } from "antd";
import React, { Component } from "react";
import "./App.css";
import logo from "./logo.png";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InventoryContent from "./Inventory";
import ProjectsContent from "./Projects";
import HistoryContent from "./History";

const { Header, Sider } = Layout;
class App extends Component {
  state = {
    collapsed: false
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

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
    console.log("toggle");
  };

  InventoryContent = () => {
    // this.displayResults("api/getInventory/");
    // const newInventory = ReactDOM.cloneNode(InventoryContent, {

    // })
    return <InventoryContent />;
  };

  ProjectsContent = () => {
    // this.displayResults("api/getProjects/");
    return <ProjectsContent />;
  };

  // ScanContent = () => {
  //   return <ScanContent dataparam={this.state.data} />;
  // };

  HistoryContent = () => {
    // this.displayResults("api/getHistory/");
    return <HistoryContent />;
  };
  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo">
              <img src={logo} alt="logo" width="100%" />
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/inventory/">
                  <Icon type="user" />
                  <span>Inventory</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="2">
                <Link to="/scan/">
                  <Icon type="video-camera" />
                  <span>Barcode Scan</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/projects/">
                  <Icon type="upload" />
                  <span>Projects</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
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
              Pathology Informatics - Inventory
            </Header>

            <Route path="/inventory/" component={InventoryContent} />

            {/* <Route path="/scan/" component={Users} /> */}
            <Route path="/projects/" component={ProjectsContent} />
            <Route path="/history/" component={HistoryContent} />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;

// const World = props => {
//   if (props.who === "Number") {
//     return <div>42! </div>;
//   } else {
//     return <h1>World</h1>;
//   }
// };
