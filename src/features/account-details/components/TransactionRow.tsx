import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { ExchangeRate, Transaction } from "../../account-list/types/api";

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

type TransactionRowProps = {
  transaction: Transaction;
  exchangeRates: ExchangeRate;
};

const TransactionRow = ({
  exchangeRates,
  transaction,
}: TransactionRowProps) => {
  const classes = useStyles();
  const {
    confirmedDate,
    orderId,
    orderCode,
    transactionType,
    credit,
    balance,
  } = transaction;

  return (
    <TableRow className={classes.tableRow}>
      <TableCell align="right">{confirmedDate}</TableCell>
      <TableCell align="right">{orderId.toUpperCase()}</TableCell>
      <TableCell align="right">{orderCode}</TableCell>
      <TableCell align="right">{transactionType}</TableCell>
      <TableCell align="right">
        <div className={classes.balance}>
          <span>{credit} BTC</span>
          <span>
            ${" "}
            {exchangeRates.bitcoin
              ? (exchangeRates.bitcoin * Number(credit)).toFixed(10)
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
              ? (exchangeRates.bitcoin * Number(balance)).toFixed(10)
              : "Not available"}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;
