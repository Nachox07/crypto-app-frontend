export type BTAccount = {
  id: string;
  name: string;
  category: string;
  tag: string;
  balance: number;
  availableBalance: number;
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
