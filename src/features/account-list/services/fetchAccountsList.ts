import { Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { AccountsAPIResponse } from "../types/api";

export type AccountListFetchSuccessEvent = {
  type: "ACCOUNT_LIST_FETCH_SUCCESS";
  data: AccountsAPIResponse;
};

export type AccountListFetchFailedEvent = {
  type: "ACCOUNT_LIST_FETCH_FAILED";
  data: { message: string };
};

const fetchAccountsList = (): Observable<
  AccountListFetchSuccessEvent | AccountListFetchFailedEvent
> =>
  ajax.getJSON<AccountsAPIResponse>("http://localhost:8080/accounts").pipe(
    map(
      response =>
        ({
          type: "ACCOUNT_LIST_FETCH_SUCCESS",
          data: response,
        } as AccountListFetchSuccessEvent),
    ),
    catchError(error =>
      of({
        type: "ACCOUNT_LIST_FETCH_FAILED",
        data: error,
      } as AccountListFetchFailedEvent),
    ),
  );

export default fetchAccountsList;
