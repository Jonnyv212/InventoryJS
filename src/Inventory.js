import React, { Component } from "react";
import { Layout, Table, Spin, Select, Input, Button } from "antd";
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
    loadingEnabled: true //Initiate a loadingEnabled state that renders the spinner loading animation if false. Default: true
  };

  //Initial function called.
  componentDidMount(data) {
    setTimeout(() => {
      this.getFullInventory();
    }, 1000);
  }

  //Get an array of objects containing data and assign it to this.state.data
  getFullInventory() {
    console.log("Searching for data...");
    axios
      .get("/inventory/api/getInventory/") //Data pulled from index.js
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
            "/inventory/api/getInventorySearch/" +
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

  render() {
    //If the loading state is true then render the loading spinner
    if (this.state.loadingEnabled == true) {
      return this.spinner();
    }

    return (
      <React.Fragment>
        <div className="dataMenus">
          <Select
            showSearch
            style={{ width: 200 }}
            size="large"
            placeholder={"Select a filter"}
            optionFilterProp="children"
            onChange={this.onFilterChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
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
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  console.log("Clicked this " + record.INVENTORY_ID);
                }, // click row
                onDoubleClick: event => {} // double click row
              };
            }}
            dataSource={this.state.data}
            columns={[
              {
                title: "Inventory ID",
                dataIndex: "INVENTORY_ID"
              },
              {
                title: "Equipment Name",
                dataIndex: "EQUIPMENT_NAME"
              },
              {
                title: "Category Name",
                dataIndex: "CATEGORY_NAME"
              },
              {
                title: "Project Name",
                dataIndex: "PROJECT_NAME"
              },
              {
                title: "Term ID",
                dataIndex: "TERM_ID"
              },
              {
                title: "Date",
                dataIndex: "INVENTORY_DATE"
              },
              {
                render: value => (
                  <Button
                    style={{ width: 80, height: 40 }}
                    size="large"
                    type="primary"
                    onClick={null}
                    data-src={value}
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
