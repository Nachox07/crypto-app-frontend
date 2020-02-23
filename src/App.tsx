import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountDetailsScreen from "./features/account-details/AccountDetailsScreen";
import AccountListScreen from "./features/account-list/AccountListScreen";
import AppHeader from "./features/app-header/AppHeader";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/accountDetails/:accountId">
            <AccountDetailsScreen />
          </Route>
          <Route path={["/", "/accountsList"]}>
            <AccountListScreen />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
