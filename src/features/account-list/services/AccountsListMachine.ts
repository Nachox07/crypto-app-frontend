import { Machine, assign } from "xstate";
import { BTAccount, ExchangeRate } from "../types/api";
import fetchAccountsList, {
  AccountListFetchSuccessEvent,
  AccountListFetchFailedEvent,
} from "./fetchAccountsList";
import exchangeRateObservable, {
  ExchangeRateSuccessEvent,
  ExchangeRateFailedEvent,
} from "./exchangeRateObservable";

type AccountListStateSchema = {
  states: {
    pending: {};
    browsing: {};
    failure: {};
  };
};

export type AccountListContext = {
  accounts: BTAccount[];
  exchangeRates: ExchangeRate;
  error: string | null;
};

const AccountsListMachine = Machine<AccountListContext, AccountListStateSchema>(
  {
    id: "accountList",
    initial: "pending",
    context: {
      accounts: [],
      exchangeRates: {
        bitcoin: null,
      },
      error: null,
    },
    states: {
      pending: {
        invoke: {
          src: fetchAccountsList,
        },
        on: {
          ACCOUNT_LIST_FETCH_SUCCESS: {
            target: "browsing",
            actions: assign<AccountListContext, AccountListFetchSuccessEvent>({
              accounts: (_, event) => event.data.accounts,
            }),
          },
          ACCOUNT_LIST_FETCH_FAILED: {
            target: "failure",
            actions: assign<AccountListContext, AccountListFetchFailedEvent>({
              error: (_, event) => event.data,
            }),
          },
        },
      },
      browsing: {
        invoke: {
          src: () => exchangeRateObservable,
        },
        on: {
          EXCHANGE_UPDATE_SUCCESS: {
            actions: assign<AccountListContext, ExchangeRateSuccessEvent>({
              exchangeRates: (_, event) => event.data,
            }),
          },
          EXCHANGE_UPDATE_FAILED: {
            target: "failure",
            actions: assign<AccountListContext, ExchangeRateFailedEvent>({
              error: (_, event) => event.data,
            }),
          },
        },
      },
      failure: {
        on: { RETRY: "pending" },
      },
    },
  },
);

export default AccountsListMachine;
