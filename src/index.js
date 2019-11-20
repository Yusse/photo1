import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Swipe from "./Swipe";
import "./app.scss";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="demo">
          <Switch>
            <Route exact path="/" component={Swipe} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
