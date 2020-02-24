export type Transaction = {
  confirmedDate: Date;
  orderId: string;
  orderCode: string;
  transactionType: string;
  credit: string;
  balance: string;
};

export type BTAccount = {
  accountId: string;
  name: string;
  category: string;
  tag: string;
  balance: number;
  availableBalance: number;
  transactions: Transaction[];
};

export type ExchangeRate = {
  bitcoin: number | null;
};

export type AccountsAPIResponse = {
  accounts: BTAccount[];
};

export type Balance = {
  balance: number;
};
