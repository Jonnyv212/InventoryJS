import React, { Component } from "react";
import { Layout } from "antd";
import { Table } from "antd";
import { Icon } from "antd";
import axios from "axios";

const { Content } = Layout;

class HistoryContent extends Component {
  state = {
    data: []
  };
  componentDidMount(data) {
    axios.get("/history/api/getHistory/").then(response => {
      this.setState({ data: response.data });
    });
    console.log(this.state.data);
  }
  render() {
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
        <div className="subheader">
          <Icon
            type="arrow-left"
            style={{
              fontSize: "35px",
              color: "#08c",
              margin: "10px 10px"
            }}
            onClick={() => {
              console.log("test");
            }}
          />
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
        </div>

        <Table
          dataSource={this.state.data}
          columns={[
            {
              title: "History ID",
              dataIndex: "HISTORY_ID",
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
              title: "Event",
              dataIndex: "EVENT"
            },
            {
              title: "Description",
              dataIndex: "HISTORY_DESCRIPTION"
            },
            {
              title: "Date",
              dataIndex: "HISTORY_DATE"
            }
          ]}
        />
      </Content>
    );
  }
}

// module.exports = InventoryContent;
export default HistoryContent;
