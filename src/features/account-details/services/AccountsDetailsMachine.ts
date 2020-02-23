import { Machine, assign } from "xstate";
import { BTAccount, ExchangeRate } from "../../account-list/types/api";
import {
  AccountDetailsFetchSuccessEvent,
  AccountDetailsFetchFailedEvent,
} from "./createFetchAccountsDetails";
import exchangeRateObservable, {
  ExchangeRateSuccessEvent,
  ExchangeRateFailedEvent,
} from "../../account-list/services/exchangeRateObservable";

type AccountListStateSchema = {
  states: {
    pending: {};
    browsing: {};
    failure: {};
  };
};

export type AccountDetailsContext = {
  data: BTAccount | null;
  exchangeRates: ExchangeRate;
  error: string | null;
};

const AccountsListMachine = Machine<
  AccountDetailsContext,
  AccountListStateSchema
>({
  id: "accountList",
  initial: "pending",
  context: {
    data: null,
    exchangeRates: {
      bitcoin: null,
    },
    error: null,
  },
  states: {
    pending: {
      invoke: {
        src: "fetchAccountDetails",
      },
      on: {
        ACCOUNT_LIST_FETCH_SUCCESS: {
          target: "browsing",
          actions: assign<
            AccountDetailsContext,
            AccountDetailsFetchSuccessEvent
          >({
            data: (_, event) => event.data,
          }),
        },
        ACCOUNT_LIST_FETCH_FAILED: {
          target: "failure",
          actions: assign<
            AccountDetailsContext,
            AccountDetailsFetchFailedEvent
          >({
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
          actions: assign<AccountDetailsContext, ExchangeRateSuccessEvent>({
            exchangeRates: (_, event) => event.data,
          }),
        },
        EXCHANGE_UPDATE_FAILED: {
          target: "failure",
          actions: assign<AccountDetailsContext, ExchangeRateFailedEvent>({
            error: (_, event) => event.data,
          }),
        },
      },
    },
    failure: {
      on: { RETRY: "pending" },
    },
  },
});

export default AccountsListMachine;
