import React, { Component } from "react";
import { Layout } from "antd";
import { Table } from "antd";
import axios from "axios";

const { Content } = Layout;

class InventoryContent extends Component {
  state = {
    data: []
  };
  componentDidMount(data) {
    axios.get("/inventory/api/getInventory/").then(response => {
      this.setState({ data: response.data });
    });
    console.log(this.state.data);
  }

  render() {
    return (
      <Content
        style={{
          margin: "16px 16px",
          padding: 24,
          background: "#fff",
          minHeight: 970,
          overflow: "auto"
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

        <Table
          dataSource={this.state.data}
          columns={[
            {
              title: "Inventory ID",
              dataIndex: "INVENTORY_ID",
              render: value => (
                <button
                  onClick={() => {
                    alert(value + 1);
                  }}
                  data-src={value}
                >
                  {value}
                </button>
              )
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

// module.exports = InventoryContent;
export default InventoryContent;
