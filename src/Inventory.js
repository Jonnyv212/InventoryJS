import React, { Component } from "react";
import { Layout } from "antd";
import { Table } from "antd";
import { Icon } from "antd";
import axios from "axios";
import { Spin, Alert } from "antd";
import { Select } from "antd";

const { Content } = Layout;

const Option = Select.Option;

// function onBlur() {
//   console.log("Blur");
// }

// function onFocus() {
//   console.log("focus");
// }

// function onSearch(val) {
//   console.log("search:", val);
// }

class InventoryContent extends Component {
  state = {
    data: [],
    search: "",
    results: []
  };

  spinner = () => {
    return (
      <Spin tip="Loading..." size={"large"}>
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
    );
  };
  componentDidMount(data) {
    setTimeout(() => {
      axios.get("/inventory/api/getInventory/").then(response => {
        this.setState({ data: response.data });
      });
    }, 500);
  }

  updateSearch(event) {
    this.setState(
      {
        search: event.target.value.substr(0, 20)
      },
      () => {
        return new Promise((resolve, reject) => {
          const num = this.state.search.match(/[0-9]/);

          if (num == null) {
            axios.get("/inventory/api/getInventory/").then(response => {
              this.setState({ data: response.data });
            });
            console.log("Num is null");
          } else {
            axios
              .get("/inventory/api/getInventorySearch/" + num.input)
              .then(response => {
                this.setState({ data: response.data });
                console.log(num.input);
              });
          }
        });
      }
    );
  }
  // console.log(this.state.search + " - " + this.state.results)
  // this.setState({ search: event.target.value.substr(0, 20) }, () => {
  //   console.log("state search: " + this.state.search);
  //   this.setState(
  //     {
  //       results: this.state.data.filter(fData => {
  //         return fData.INVENTORY_ID.indexOf(this.state.search) !== -1;
  //       })
  //     },
  //     () => {
  //       console.log(this.state.results);
  //     }
  //   );
  // });

  // this.setState({ results: filteredData });

  onChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    // if (!this.state.data.length) {
    //   return setTimeout(() => {
    //     this.spinner();
    //   }, 500);
    // }

    return (
      <Content
        style={{
          margin: "0px 1px",
          padding: 0,
          background: "#fff",
          minHeight: 970,
          overflow: "auto"
        }}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a filter"
          optionFilterProp="children"
          onChange={this.onChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="INVENTORY_ID">Inventory ID</Option>
          <Option value="EQUIPMENT_NAME">Equipment Name</Option>
          <Option value="CATEGORY_NAME">Category Name</Option>
          <Option value="PROJECT_NAME">Project Name</Option>
          <Option value="TERM_ID">Term ID</Option>
          <Option value="INVENTORY_DATE">Date</Option>
        </Select>

        <form>
          <input
            placeholder="Search for..."
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </form>
        {/* <div>
          <li>{this.state.results}</li>
        </div> */}
        <Table
          dataSource={this.state.data}
          columns={[
            {
              title: "Inventory ID",
              dataIndex: "INVENTORY_ID"
              // render: value => (
              //   <button
              //     onClick={() => {
              //       alert(value + 1);
              //     }}
              //     data-src={value}
              //   >
              //     {value}
              //   </button>
              // )
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
            }
          ]}
        />
        {/* <Search /> */}
        {/* {this.state.data.length ? (
          <table className="dbTable">
            <thead className="dbColumns">
              <tr>
                {Object.keys(this.state.data[0]).map(id => {
                  return (
                    <th
                      className="dbRows"
                      onClick={() => console.log("Clicked a column " + id)}
                    >
                      {id}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(items => {
                return (
                  <tr>
                    {Object.keys(items).map(id => {
                      return (
                        <td
                          className="dbRows"
                          onClick={() =>
                            console.log("Clicked a row " + items[id])
                          }
                        >
                          {items[id]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null} */}
      </Content>
    );
  }
}

export default InventoryContent;
