import { useMachine } from "@xstate/react";
import AccountsListMachine from "./AccountsListMachine";

const useAccountListMachine = () => {
  const [accountList, send] = useMachine(AccountsListMachine);

  return {
    isInState: accountList.matches,
    accounts: accountList.context.accounts,
    exchanges: accountList.context.exchanges,
  };
};

export default useAccountListMachine;
