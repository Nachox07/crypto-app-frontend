export type BTAccount = {
  id: string;
  name: string;
  category: string;
  tag: string;
  availableBalance: number;
};

export type ExchangeRate = {
  bitcoin: number | null;
};

export type AccountsAPIResponse = {
  accounts: BTAccount[];
};
