import { Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { BTAccount } from "../../account-list/types/api";

export type AccountDetailsFetchSuccessEvent = {
  type: "ACCOUNT_LIST_FETCH_SUCCESS";
  data: BTAccount;
};

export type AccountDetailsFetchFailedEvent = {
  type: "ACCOUNT_LIST_FETCH_FAILED";
  data: { message: string };
};

const createFetchAccountsDetails = (
  accountId: string | undefined,
) => (): Observable<
  AccountDetailsFetchSuccessEvent | AccountDetailsFetchFailedEvent
> =>
  typeof accountId !== "undefined"
    ? ajax
        .getJSON<BTAccount>(`http://localhost:8080/accounts/${accountId}`)
        .pipe(
          map(
            response =>
              ({
                type: "ACCOUNT_LIST_FETCH_SUCCESS",
                data: response,
              } as AccountDetailsFetchSuccessEvent),
          ),
          catchError(error =>
            of({
              type: "ACCOUNT_LIST_FETCH_FAILED",
              data: error,
            } as AccountDetailsFetchFailedEvent),
          ),
        )
    : of({
        type: "ACCOUNT_LIST_FETCH_FAILED",
        data: { message: "Invalid account id" },
      });

export default createFetchAccountsDetails;
