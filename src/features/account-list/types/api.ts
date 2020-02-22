export type BTAccount = {
  name: string;
  category: string;
  tag: string;
  availableBalance: number;
};

export type Exchanges = {
  bitcoin: number | null;
};

export type AccountsAPIResponse = {
  accounts: BTAccount[];
  exchanges: Exchanges;
};
