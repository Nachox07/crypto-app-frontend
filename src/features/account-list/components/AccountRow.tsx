import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { BTAccount } from "../types/api";

const useStyles = makeStyles({
  balance: {
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "column",
  },
});

type AccountRowProps = {
  account: BTAccount;
};

const AccountRow = ({ account }: AccountRowProps) => {
  const classes = useStyles();

  return (
    <TableRow key={account.name}>
      <TableCell component="th" scope="row">
        {account.name}
      </TableCell>
      <TableCell align="right">{account.category}</TableCell>
      <TableCell align="right">{account.tag}</TableCell>
      <TableCell align="right">
        <div className={classes.balance}>
          <span>{account.availableBalance} BTC</span>
          <span>$ {account.availableBalance}</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AccountRow;
