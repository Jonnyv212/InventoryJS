import React, { Component } from "react";
import { Layout } from "antd";
import { Table } from "antd";
import { Icon } from "antd";
import axios from "axios";
import { Spin, Alert } from "antd";

const { Content } = Layout;

class ProjectsContent extends Component {
  state = {
    data: []
  };

  componentDidMount(data) {
    setTimeout(() => {
      axios.get("/projects/api/getProjects/").then(response => {
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

        <Table
          dataSource={this.state.data}
          columns={[
            {
              title: "Project ID",
              dataIndex: "PROJECT_ID",
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
              dataIndex: "PROJECT_NAME"
            },
            {
              title: "Ticket Number",
              dataIndex: "TICKET_NO"
            },
            {
              title: "Description",
              dataIndex: "PROJECT_DESCRIPTION"
            }
          ]}
        />
      </Content>
    );
  }
}

// module.exports = InventoryContent;
export default ProjectsContent;
