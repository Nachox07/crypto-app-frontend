import subscribeToTopic from "../../../sdk/websocketUtils/subscribeToTopic";

const accountPriceObservable = (accountId: string) =>
  subscribeToTopic(accountId);

export default accountPriceObservable;
