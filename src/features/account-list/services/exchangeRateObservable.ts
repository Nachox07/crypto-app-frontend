import subscribeToTopic from "../../../sdk/websocketUtils/subscribeToTopic";
import { map, catchError, shareReplay } from "rxjs/operators";
import { of } from "rxjs";
import { ExchangeRate } from "../types/api";

export type ExchangeRateSuccessEvent = {
  type: "EXCHANGE_UPDATE_SUCCESS";
  data: ExchangeRate;
};

export type ExchangeRateFailedEvent = {
  type: "EXCHANGE_UPDATE_FAILED";
  data: string;
};

const exchangeRateObservable = subscribeToTopic<{
  exchangeRates: ExchangeRate;
}>("exchangeRatesUpdate").pipe(
  shareReplay(1),
  map(
    response =>
      ({
        type: "EXCHANGE_UPDATE_SUCCESS",
        data: response.exchangeRates,
      } as ExchangeRateSuccessEvent),
  ),
  catchError(error =>
    of({
      type: "EXCHANGE_UPDATE_FAILED",
      data: error,
    } as ExchangeRateFailedEvent),
  ),
);

export default exchangeRateObservable;
