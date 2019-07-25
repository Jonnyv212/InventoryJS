import React, { Component } from "react";
import { Layout, Table, Spin, Select, Input, Button, Form, Icon } from "antd";
import axios from "axios";

const Search = Input.Search;
const { Content } = Layout;
const Option = Select.Option;

class InventoryContent extends Component {
  state = {
    data: [], //Contains an array of objects in JSON
    search: "", //Contains the searched input as a state to use as a parameter in the query
    filter: "", //Contains the currently selected filter option as a state to use as a parameter in the query
    searchDisabled: true, //Enable the search bar if false. Default: true
    loadingEnabled: true, //Initiate a loadingEnabled state that renders the spinner loading animation if false. Default: true
    editSelection: false, //State that determines whether to display an edit page for a row within Inventory.
    editData: []
  };

  //Initial function called.
  componentDidMount() {
    setTimeout(() => {
      this.getFullInventory();
    }, 1000);
  }

  getEditIDInfo() {
    axios
      .get("/api/getInventoryID/" + this.state.editData)
      .then(response => {
        console.log(response);
      })
      .catch(message => {
        setTimeout(() => {
          console.log("No data found. " + message);
        }, 5000);
      });
  }
  //Get an array of objects containing data and assign it to this.state.data
  getFullInventory() {
    console.log("Searching for data...");
    axios
      .get("/api/getInventory/") //Data pulled from index.js
      .then(response => {
        if (this.state.data) {
          this.setState({
            data: response.data,
            loadingEnabled: false,
            searchDisabled: true
          }); //data state set, Loading disabled, Search disabled.
          console.log("Data found.");
        }
      })
      .catch(message => {
        //No data is found.
        setTimeout(() => {
          //Set a timeout for five seconds that will disable loading and search.
          this.setState(
            {
              loadingEnabled: false,
              searchDisabled: true
            },
            console.log("search state: " + this.state.searchDisabled)
          );
          console.log(" No data found. " + message);
        }, 5000);
      });
  }

  querySearch(value) {
    this.setState(
      {
        loadingEnabled: true, //Enable loading to start the spinner animation.
        search: value //Set search state to parameter value
      },
      () => {
        //inventory/api/getInventorySearch/:filter/:search/ the Filter parameter pertains to column.
        //The Search parameter pertains to data within that column.
        axios
          .get(
            "/api/getInventorySearch/" +
              this.state.filter +
              "/" +
              this.state.search
          )
          .then(response => {
            this.setState({
              data: response.data,
              loadingEnabled: false,
              searchDisabled: true
            });
          })
          .catch(message => {
            setTimeout(() => {
              this.setState(
                {
                  loadingEnabled: false,
                  searchDisabled: true
                },
                console.log("No data found. " + message)
              );
            }, 5000);
          });
      }
    );
  }
  // clearInput = () => {
  //   this.getFullInventory();
  //   this.setState({ search: null });
  // };

  //Function activated when clicking an item on its dropdown menu.
  onFilterChange = value => {
    this.setState({
      searchDisabled: false,
      filter: value
    });
  };

  //Loading spinner
  spinner = () => {
    return (
      <Spin
        style={{ fontSize: 32, position: "fixed", top: "50%", left: "50%" }}
        tip="Loading..."
        size={"large"}
      />
    );
  };

  editItem = () => {
    return (
      <div className="dataMenus">
        {this.backArrow()}

        <Content>
          <div className="editContent">
            <Form onSubmit={null}>
              <div className="formtest">
                <Form.Item>
                  INVENTORY ID
                  <Input
                    disabled={true}
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="INVENTORY ID goes here"
                    value={this.state.editData[0]}
                  />
                </Form.Item>
                <Form.Item>
                  EQUIPMENT
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Equipment name goes here"
                    value={this.state.editData[1]}
                  />
                </Form.Item>
                <Form.Item>
                  CATEGORY
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Category name goes here"
                    value={this.state.editData[2]}
                  />
                </Form.Item>
              </div>
              <div className="formtest">
                <Form.Item>
                  PROJECT
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Project name goes here"
                    value={this.state.editData[3]}
                  />
                </Form.Item>
                <Form.Item>
                  TERM ID
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Term ID goes here"
                    value={this.state.editData[4]}
                  />
                </Form.Item>
                <Form.Item>
                  DATE
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Date goes here"
                    value={this.state.editData[5]}
                  />
                </Form.Item>
              </div>
            </Form>
            <Button
              style={{ width: 100, height: 40 }}
              size="large"
              type="primary"
            >
              Save
            </Button>
          </div>
        </Content>
      </div>
    );
  };
  backArrow = () => {
    return (
      <Button
        icon="arrow-left"
        disabled={!this.state.editSelection}
        size={"large"}
        style={{
          // fontSize: "15px",
          color: "#08c",
          paddingRight: "24px",
          paddingLeft: "24px",
          marginRight: "32px"
        }}
        onClick={() => {
          this.setState({ editSelection: false });
          console.log("test " + this.state.editSelection);
        }}
      />
    );
  };
  render() {
    //If the loading state is true then render the loading spinner
    if (this.state.loadingEnabled == true) {
      return this.spinner();
    }

    if (this.state.editSelection) {
      return this.editItem();
    }
    return (
      <React.Fragment>
        <div className="dataMenus">
          {this.backArrow()}
          <Select
            showSearch
            style={{ width: 200, marginRight: "32px" }}
            size="large"
            placeholder={"Select a filter"}
            optionFilterProp="children"
            onChange={this.onFilterChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="INVENTORY_ID">Inventory ID</Option>
            <Option value="EQUIPMENT_NAME">Equipment Name</Option>
            <Option value="CATEGORY_NAME">Category Name</Option>
            <Option value="PROJECT_NAME">Project Name</Option>
            <Option value="TERM_ID">Term ID</Option>
            <Option value="INVENTORY_DATE">Date</Option>
          </Select>

          <Search
            id="myInput"
            disabled={this.state.searchDisabled}
            style={{ width: 350 }}
            placeholder={this.state.search}
            enterButton="Search"
            size="large"
            onSearch={value => {
              this.querySearch(value);
            }}
          />

          <Button
            style={{ width: 80, height: 40 }}
            size="large"
            type="default"
            onClick={null}
          >
            Clear
          </Button>
        </div>
        <hr style={{ color: "rgba(0,0,0,.25)" }} />
        <Content
          style={{
            margin: "0px 1px",
            padding: 10,
            background: "#fff"
            // minHeight: 970,
            // overflow: "auto"
          }}
        >
          <Table
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: event => {
            //       console.log("Clicked this " + record.INVENTORY_ID);
            //     }
            //   };
            // }}
            dataSource={this.state.data}
            columns={[
              {
                title: "Inventory ID",
                dataIndex: "inventory_id"
              },
              {
                title: "Equipment Name",
                dataIndex: "equipment_name"
              },
              {
                title: "Category Name",
                dataIndex: "category_name"
              },
              {
                title: "Project Name",
                dataIndex: "project_name"
              },
              {
                title: "Term ID",
                dataIndex: "term_id"
              },
              {
                title: "Date",
                dataIndex: "date"
              },
              {
                render: value => (
                  <Button
                    style={{ width: 80, height: 40 }}
                    size="large"
                    type="primary"
                    onClick={() => {
                      const array = [
                        value.INVENTORY_ID,
                        value.EQUIPMENT_NAME,
                        value.CATEGORY_NAME,
                        value.PROJECT_NAME,
                        value.TERM_ID,
                        value.INVENTORY_DATE
                      ];
                      // var arrayLength = array.length;
                      // for (var i = 0; i < arrayLength; i++) {
                      //   this.state.editData.push(array[i]);
                      //   console.log(this.state.editData);
                      // }
                      this.setState(
                        {
                          editSelection: true,
                          editData: array
                        },
                        () => {
                          console.log("call" + this.state.editData[0]);
                        }
                      );
                    }}
                    // data-src={value}
                  >
                    Edit
                  </Button>
                )
              }
            ]}
          />
        </Content>
      </React.Fragment>
    );
  }
}

export default InventoryContent;
