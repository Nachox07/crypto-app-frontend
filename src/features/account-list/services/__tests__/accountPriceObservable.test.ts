import * as socketIO from "socket.io-client";
import SocketMock from "socket.io-mock";
import accountPriceObservable from "../accountPriceObservable";

jest.mock("socket.io-client");

describe("accountPriceObservable", () => {
  it("emits a value when account update is sent by WS", done => {
    const socket = new SocketMock();

    (socketIO.connect as jest.Mock).mockImplementationOnce(() => socket);

    accountPriceObservable("test-account-1").subscribe({
      next(value) {
        expect(value).toEqual({
          balance: 1000,
        });
        done();
      },
    });

    socket.socketClient.emit("test-account-1", {
      balance: 1000,
    });
  });
});
