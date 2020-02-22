import React from "react";
import useAccountListMachine from "./services/useAccountListMachine";

const AccountListScreen = () => {
  const { isInState } = useAccountListMachine();

  if (isInState("pending")) {
    return <div>Loading</div>;
  }

  return <div>AccountListScreen</div>;
};

export default AccountListScreen;
