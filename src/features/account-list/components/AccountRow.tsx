import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import accountPriceObservable from "../services/accountPriceObservable";
import { BTAccount, ExchangeRate } from "../types/api";

const useStyles = makeStyles({
  balance: {
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "column",
  },
  tableRow: {
    cursor: "pointer",
  },
});

type AccountRowProps = {
  account: BTAccount;
  exchangeRates: ExchangeRate;
};

const AccountRow = ({ account, exchangeRates }: AccountRowProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { accountId } = account;
  const [balance, setBalance] = useState(account.balance);
  const [rowBackgroundColor, setRowBackgroundColor] = useState("#fff");

  useEffect(() => {
    const subscriber = accountPriceObservable(
      `account-${account.accountId}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  return (
    <TableRow
      className={classes.tableRow}
      style={{ backgroundColor: rowBackgroundColor }}
      onClick={() => history.push(`/accountDetails/${accountId}`)}
    >
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
            {exchangeRates.bitcoin
              ? (exchangeRates.bitcoin * balance).toFixed(10)
              : "Not available"}
          </span>
        </div>
      </TableCell>
      <TableCell align="right">
        <div className={classes.balance}>
          <span>{balance} BTC</span>
          <span>
            ${" "}
            {exchangeRates.bitcoin
              ? (exchangeRates.bitcoin * balance).toFixed(10)
              : "Not available"}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AccountRow;
