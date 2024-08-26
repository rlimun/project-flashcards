
import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout/index";

// Your existing App component
function App() {
  console.log("App is rendering");
  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
