import { Machine, assign } from "xstate";
import { BTAccount, Exchanges } from "../types/api";
import fetchAccountsList, {
  AccountListFetchSuccessEvent,
  AccountListFetchFailedEvent,
} from "./fetchAccountsList";

type AccountListStateSchema = {
  states: {
    pending: {};
    browsing: {};
    failure: {};
  };
};

export type AccountListContext = {
  accounts: BTAccount[];
  exchanges: Exchanges;
  error: string | null;
};

const AccountsListMachine = Machine<AccountListContext, AccountListStateSchema>(
  {
    id: "accountList",
    initial: "pending",
    context: {
      accounts: [],
      exchanges: {
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
              exchanges: (_, event) => event.data.exchanges,
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
      browsing: {},
      failure: {
        on: { RETRY: "pending" },
      },
    },
  },
);

export default AccountsListMachine;
