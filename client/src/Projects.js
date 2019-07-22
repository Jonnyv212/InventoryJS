import React, { Component } from "react";
import { Layout } from "antd";
import { Table } from "antd";
import { Icon } from "antd";
import axios from "axios";
import { Spin, Alert } from "antd";

const { Content } = Layout;

class ProjectsContent extends Component {
  state = {
    data: [],

    columns: [
      {
        title: "Name",
        dataIndex: "name"
      }
    ],

    data2: [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park"
      }
    ]
  };

  componentDidMount() {
    setTimeout(() => {
      axios.get("/api/getProjects/").then(response => {
        this.setState({ data: response.data });
      });
    }, 500);
  }

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

  render() {
    console.log(this.state.data);
    if (!this.state.data.length) {
      return this.spinner();
    }
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

        <div className="dbRows">
          <Table
            dataSource={this.state.data}
            columns={[
              {
                title: "Project ID",
                dataIndex: "project_id",
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
                title: "Project Name",
                dataIndex: "project_name"
              },
              {
                title: "Ticket Number",
                dataIndex: "ticket_no"
              },
              {
                title: "Description",
                dataIndex: "project_description"
              }
            ]}
          />
        </div>
      </Content>
    );
  }
}

// module.exports = InventoryContent;
export default ProjectsContent;
