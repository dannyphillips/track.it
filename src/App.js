import React, { Fragment, Component } from "react";
import { ToolHeader, Button } from "@procore/core-react";
import { EquipmentCard } from "./EquipmentCard";
import { exampleJSON } from "./exampleJSON";
import "whatwg-fetch";

const token = "INSERT_TOKEN_HERE"; // After you fetch a new one

class App extends Component {
  refreshEquipment() {
    window.location.reload();
  }

  componentWillMount() {
    // this.auth();
  }
  auth() {
    fetch("https://api.procore.com/vapid/projects/453577/equipment_logs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      }
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(equipment_logs) {
        console.log(equipment_logs);
      });
  }

  render() {
    return (
      <Fragment>
        <ToolHeader>
          <ToolHeader.Icon />
          <ToolHeader.Title>Equipment Tracker</ToolHeader.Title>
          <ToolHeader.Actions>
            <Button onClick={this.refreshEquipment}>Refresh</Button>
          </ToolHeader.Actions>
        </ToolHeader>
        {exampleJSON.map(equipment => (
          <EquipmentCard data={equipment} key={Math.random(100)} />
        ))}
      </Fragment>
    );
  }
}

export default App;
