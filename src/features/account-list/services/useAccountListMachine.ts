import { useMachine } from "@xstate/react";
import AccountsListMachine from "./AccountsListMachine";

const useAccountListMachine = () => {
  const [accountList, send] = useMachine(AccountsListMachine);

  return {
    isInState: accountList.matches,
    accounts: accountList.context.accounts,
    exchanges: accountList.context.exchanges,
    error: accountList.context.error,
  };
};

export default useAccountListMachine;
