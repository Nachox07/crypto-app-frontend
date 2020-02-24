import subscribeToTopic from "../../../sdk/websocketUtils/subscribeToTopic";
import { BTAccount } from "../types/api";

const accountPriceObservable = (accountId: string) =>
  subscribeToTopic<{ balance: BTAccount["balance"] }>(accountId);

export default accountPriceObservable;
