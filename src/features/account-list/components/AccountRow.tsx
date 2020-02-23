import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { BTAccount, ExchangeRate, Balance } from "../types/api";
import accountPriceObservable from "../services/accountPriceObservable";

const useStyles = makeStyles({
  balance: {
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "column",
  },
});

type AccountRowProps = {
  account: BTAccount;
  exchangeRate: ExchangeRate;
};

const AccountRow = ({ account, exchangeRate }: AccountRowProps) => {
  const classes = useStyles();
  const [balance, setBalance] = useState(account.availableBalance);
  const [rowBackgroundColor, setRowBackgroundColor] = useState("#fff");

  useEffect(() => {
    const subscriber = accountPriceObservable<Balance>(
      `account-${account.id}`,
    ).subscribe(update => {
      if (update.balance > balance) {
        setRowBackgroundColor("#00FF00");
      } else {
        setRowBackgroundColor("#FF001B");
      }

      setBalance(update.balance);

      setTimeout(() => setRowBackgroundColor("#fff"), 1000);
    });

    return () => {
      subscriber.unsubscribe();
    };
  }, []);

  return (
    <TableRow style={{ backgroundColor: rowBackgroundColor }}>
      <TableCell component="th" scope="row">
        {account.name}
      </TableCell>
      <TableCell align="right">{account.category}</TableCell>
      <TableCell align="right">{account.tag}</TableCell>
      <TableCell align="right">
        <div className={classes.balance}>
          <span>{balance} BTC</span>
          <span>
            ${" "}
            {exchangeRate.bitcoin
              ? (exchangeRate.bitcoin * balance).toFixed(2)
              : "Not available"}
          </span>
        </div>
      </TableCell>
      <TableCell align="right">
        <div className={classes.balance}>
          <span>{balance} BTC</span>
          <span>
            ${" "}
            {exchangeRate.bitcoin
              ? (exchangeRate.bitcoin * balance).toFixed(2)
              : "Not available"}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AccountRow;
