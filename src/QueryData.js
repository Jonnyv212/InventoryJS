import React from "react";
import axios from "axios";

export default class QueryData extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get("/api/getInventory").then(response => {
      console.log(response);
      this.setState({ data: response.data });
    });
  }

  displayProjects() {
    axios.get("/api/getProjects").then(response => {
      this.setState({ data: response.data });
    });
  }

  render() {
    return (
      <ul>
        {this.state.data.map(item => (
          <span key={item.INVENTORY_ID}>{item.EQUIPMENT_NAME} </span>
        ))}
        <br />
      </ul>
    );
  }
}
