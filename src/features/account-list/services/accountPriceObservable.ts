import subscribeToTopic from "../../../sdk/websocketUtils/subscribeToTopic";

const accountPriceObservable = <T>(accountId: string) =>
  subscribeToTopic<T>(accountId);

export default accountPriceObservable;
