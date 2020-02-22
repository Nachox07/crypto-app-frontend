import { of, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { AccountsAPIResponse } from "../types/api";
import { AccountListContext } from "./AccountsListMachine";

export type AccountListFetchSuccessEvent = {
  type: "ACCOUNT_LIST_FETCH_SUCCESS";
  data: AccountsAPIResponse;
};

export type AccountListFetchFailedEvent = {
  type: "ACCOUNT_LIST_FETCH_FAILED";
  data: string;
};

const fetchAccountsList = (
  _: AccountListContext,
  event: any,
): Observable<AccountListFetchSuccessEvent | AccountListFetchFailedEvent> =>
  ajax.getJSON("http://localhost:8080/accounts").pipe(
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
