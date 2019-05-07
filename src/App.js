//import { stringify } from "querystring";
import { Button, Icon, Layout, Menu } from "antd";
import React, { Component } from "react";
import "./App.css";
import logo from "./logo.png";
import { Table } from "antd";
import axios from "axios";
const { Header, Sider, Content } = Layout;

class App extends Component {
  // testFunc() {
  //   return (
  //     <div>
  //       <h2>Test</h2>
  //     </div>
  //   );
  // }
  // // this.displayResults("/api/getInventory")
  // render() {
  //   return (
  //     <div className="App">
  //       <h1>Inventory</h1>
  //       <Button
  //         type="primary"
  //         onClick={() => this.displayResults("/api/getProjects")}
  //       >
  //         Push me 1
  //       </Button>
  //       <button onClick={() => this.displayResults("/api/getInventory")}>
  //         Push me 2
  //       </button>

  //       {this.state.data.length ? (
  //         <table>
  //           <thead>
  //             <tr>
  //               {Object.keys(this.state.data[0]).map(id => {
  //                 return <th>{id}</th>;
  //               })}
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {this.state.data.map(items => {
  //               return (
  //                 <tr>
  //                   {Object.keys(items).map(id => {
  //                     return <td>{items[id]}</td>;
  //                   })}
  //                 </tr>
  //               );
  //             })}
  //           </tbody>
  //         </table>
  //       ) : null}

  //     </div>
  //   );
  // }

  state = {
    collapsed: false,
    data: [],
    count: null
  };

  displayResults(path, stateKey = "data") {
    axios.get(path).then(response => {
      this.setState({ [stateKey]: response.data });
    });
    console.log(this.state.data);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      data: "state.data after toggle"
    });
  };

  foo() {
    const numbers = [1, -1, 2, 3];

    const items = numbers
      .filter(n => n >= 0) // Filter numbers in array (numbers) greater than 0. [1, 2, 3]
      .map(n => ({ value: n })) // Map each number in the array into objects. {value: 1}, {value: 2}, {value: 3}
      .filter(obj => obj.value > 1) // Filter the objects by grabbing values(in the value: property) greater than 1. {value: 2}, {value: 3}
      .map(obj => obj.value); // Map each object in the value property into an array. [2, 3]

    return console.log(items);
  }

  foo2(value, num) {
    const getNum = num + this.state.count; // increment by num
    this.setState({
      data: value,
      count: getNum
    });
  }
  componentDidMount(data) {
    axios.get("api/getProjects").then(response => {
      this.setState({ data: response.data });
    });
    // console.log(this.state.data);
  }

  render() {
    const data1 = this.state.data;

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img src={logo} alt="logo" width="200" height="150" />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item
              key="1"
              onClick={() => this.foo2("nav 1 button pressed!", 1)}
            >
              <Icon type="user" />
              <span>Inventory</span>
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => this.foo2("nav 2 button pressed!", 2)}
            >
              <Icon type="video-camera" />
              <span>Barcode Scan</span>
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => this.foo2("nav 3 button pressed!!", 3)}
            >
              <Icon type="upload" />
              <span>Projects</span>
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => this.foo2("nav 4 button pressed!!", 4)}
            >
              <Icon type="upload" />
              <span>History</span>
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
          <Content
            style={{
              margin: "16px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 970,
              overflow: "initial"
            }}
          >
            <form>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search"
                  onChange={this.filterList}
                />
              </fieldset>
            </form>
            {/* <Button
              type="primary"
              onClick={() => this.foo2("button pressed!", 1)}
            >
              Push me!
            </Button> */}
            {/* <h1>
              state.data: {this.state.data} {this.state.count}
            </h1> */}
            {/* <World who="Number" /> */}
            <Button
              type="primary"
              onClick={() => this.displayResults("/api/getInventory")}
            >
              Push me 1
            </Button>

            <Button
              type="primary"
              onClick={() => this.displayResults("/api/getProjects")}
            >
              Push me 2
            </Button>

            {/* <Table dataSource={data} columns={columns} /> */}

            {this.state.data.length ? (
              <table className="dbTable">
                <thead>
                  <tr>
                    {Object.keys(this.state.data[0]).map(id => {
                      return <th>{id}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map(items => {
                    return (
                      <tr>
                        {Object.keys(items).map(id => {
                          return <td>{items[id]}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  }
];

// const World = props => {
//   if (props.who === "Number") {
//     return <div>42! </div>;
//   } else {
//     return <h1>World</h1>;
//   }
// };
