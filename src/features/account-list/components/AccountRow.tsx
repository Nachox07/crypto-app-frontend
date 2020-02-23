import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { BTAccount, ExchangeRate } from "../types/api";
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

  useEffect(() => {
    const subscriber = accountPriceObservable(
      `account-${account.id}`,
    ).subscribe(val => {
      setBalance(((val as unknown) as any).balance);
    });

    return () => {
      subscriber.unsubscribe();
    };
  }, [account.id]);

  return (
    <TableRow>
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
              ? exchangeRate.bitcoin * balance
              : "Not avaialble"}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AccountRow;
