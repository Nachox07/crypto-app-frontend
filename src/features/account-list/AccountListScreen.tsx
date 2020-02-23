import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import AccountRow from "./components/AccountRow";
import useAccountListMachine from "./services/useAccountListMachine";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  exchange: {
    margin: 30,
    padding: 20,
  },
  tableContainer: {
    maxWidth: 850,
  },
});

const AccountListScreen = () => {
  const {
    isInState,
    accounts,
    error,
    exchangeRates,
    retry,
  } = useAccountListMachine();
  const classes = useStyles();

  if (isInState("failure")) {
    return (
      <Paper className={classes.exchange}>
        Error: {error} <button onClick={retry}>Retry</button>
      </Paper>
    );
  }

  return (
    <div className={classes.container}>
      <Paper className={classes.exchange}>
        Bitcoin exchange: {exchangeRates?.bitcoin ?? "not available"}
      </Paper>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Available balance</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isInState("pending") ? (
              <TableRow key="loading">
                <TableCell component="th" scope="row">
                  Loading...
                </TableCell>
                <TableCell align="right">Loading...</TableCell>
                <TableCell align="right">Loading...</TableCell>
                <TableCell align="right">Loading...</TableCell>
                <TableCell align="right">Loading...</TableCell>
              </TableRow>
            ) : (
              accounts.map(account => (
                <AccountRow
                  key={account.id}
                  account={account}
                  exchangeRate={exchangeRates}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AccountListScreen;
