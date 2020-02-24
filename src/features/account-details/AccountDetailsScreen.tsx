import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import accountPriceObservable from "../account-list/services/accountPriceObservable";
import useAccountDetailsMachine from "./services/useAccountDetailsMachine";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  tableContainer: {
    maxWidth: 850,
  },
  root: {
    minWidth: 475,
    margin: 30,
    padding: 20,
  },
  error: {
    margin: 30,
    padding: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  rate: {
    color: "#333",
  },
  downRate: {
    color: "#FF001B",
  },
  upRate: {
    color: "#00FF00",
  },
});

const AccountDetailsScreen = () => {
  const classes = useStyles();
  const {
    isInState,
    account,
    error,
    exchangeRates,
    retry,
  } = useAccountDetailsMachine();
  const [balance, setBalance] = useState(0);
  const [headerClass, setHeaderClass] = useState<keyof typeof classes>("rate");

  useEffect(() => {
    setBalance(account?.balance ?? 0);
  }, [account]);

  useEffect(() => {
    console.log(balance);
    if (account) {
      const subscriber = accountPriceObservable(
        `account-${account.accountId}`,
      ).subscribe(update => {
        if (update.balance > balance) {
          setHeaderClass("upRate");
        } else {
          setHeaderClass("downRate");
        }

        setBalance(update.balance);

        setTimeout(() => setHeaderClass("rate"), 1000);
      });

      return () => {
        subscriber.unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  if (isInState("failure") || !account) {
    return (
      <Paper className={classes.error}>
        Error: {error} <Button onClick={retry}>Retry</Button>
      </Paper>
    );
  }

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {account.name}
          </Typography>
          <Typography
            className={classes[headerClass]}
            variant="h5"
            component="h2"
          >
            Account balance: {account.balance} ( ${" "}
            {exchangeRates.bitcoin
              ? (exchangeRates.bitcoin * balance).toFixed(10)
              : "Not available"}
            )
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Available balance: {account.availableBalance} ( ${" "}
            {exchangeRates.bitcoin
              ? (exchangeRates.bitcoin * account.availableBalance).toFixed(10)
              : "Not available"}
            )
          </Typography>
        </CardContent>
      </Card>

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Confirmed date</TableCell>
              <TableCell align="right">Order ID</TableCell>
              <TableCell align="right">Order code</TableCell>
              <TableCell align="right">Transaction type</TableCell>
              <TableCell align="right">Credit</TableCell>
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
                <TableCell align="right">Loading...</TableCell>
                <TableCell align="right">Loading...</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AccountDetailsScreen;
