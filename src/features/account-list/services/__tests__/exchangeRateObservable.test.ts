import * as socketIO from "socket.io-client";
import SocketMock from "socket.io-mock";
import exchangeRateObservable from "../exchangeRateObservable";

jest.mock("socket.io-client");

describe("exchangeRateObservable", () => {
  it("emits a value when account update is sent by WS", done => {
    const socket = new SocketMock();

    (socketIO.connect as jest.Mock).mockImplementationOnce(() => socket);

    exchangeRateObservable.subscribe({
      next(response) {
        expect(response).toEqual({
          type: "EXCHANGE_UPDATE_SUCCESS",
          data: {
            bitcoin: 10,
          },
        });
        done();
      },
    });

    socket.socketClient.emit("exchangeRatesUpdate", {
      exchangeRates: {
        bitcoin: 10,
      },
    });
  });
});
