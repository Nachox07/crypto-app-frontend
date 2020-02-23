import { useMachine } from "@xstate/react";
import { useParams } from "react-router-dom";
import AccountsDetailsMachine from "./AccountsDetailsMachine";
import createFetchAccountsDetails from "./createFetchAccountsDetails";

const useAccountDetailsMachine = () => {
  const { accountId } = useParams();
  const fetchAccountDetails = createFetchAccountsDetails(accountId);

  const [accountDetails, send] = useMachine(AccountsDetailsMachine, {
    services: { fetchAccountDetails },
  });

  return {
    isInState: accountDetails.matches,
    account: accountDetails.context.data,
    exchangeRates: accountDetails.context.exchangeRates,
    error: accountDetails.context.error,
    retry: () => send("RETRY"),
  };
};

export default useAccountDetailsMachine;
