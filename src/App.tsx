import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountDetailsScreen from "./features/AccountDetails/AccountDetailsScreen";
import AccountListScreen from "./features/AccountList/AccountListScreen";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/accountDetails">
          <AccountDetailsScreen />
        </Route>
        <Route path={["/", "/accountsList"]}>
          <AccountListScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
