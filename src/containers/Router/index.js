import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import CreateUser from "../CreateUser/CreateUser";
import Feed from "../Feed/Feed";

export const routes = {
  
  createUser: "/CreateUser",
  root: "/",
  feed: "/feed"

};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.createUser} component={CreateUser} />
        <Route exact path={routes.feed} component={Feed} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
