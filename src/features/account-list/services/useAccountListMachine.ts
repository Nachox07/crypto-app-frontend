import { useMachine } from "@xstate/react";
import AccountsListMachine from "./AccountsListMachine";

const useAccountListMachine = () => {
  const [accountList, send] = useMachine(AccountsListMachine);

  return {
    isInState: accountList.matches,
    accounts: accountList.context.accounts,
    exchangeRates: accountList.context.exchangeRates,
    error: accountList.context.error,
    retry: () => send("RETRY"),
  };
};

export default useAccountListMachine;
