import subscribeToTopic from "../subscribeToTopic";
import * as socketIO from "socket.io-client";

jest.mock("socket.io-client");

type OnCallback = (message: string) => void;

describe("subscribeToTopic", () => {
  const socketOn = jest.fn();
  let messageCallback: OnCallback;

  (socketIO.connect as jest.Mock).mockImplementationOnce(() => ({
    on: socketOn,
    off: jest.fn(),
    disconnect: jest.fn(),
  }));

  it("emits when a message arrives on the WS", done => {
    socketOn.mockImplementationOnce((_: string, callback: OnCallback) => {
      messageCallback = callback;
    });
    subscribeToTopic("foo").subscribe({
      next(value) {
        expect(value).toEqual("test message");
        done();
      },
    });
    messageCallback("test message");
  });

  it("subscribes to the given topic", done => {
    socketOn.mockImplementationOnce((topic: string, callback: OnCallback) => {
      expect(topic).toEqual("foo");
      done();
    });

    subscribeToTopic("foo").subscribe();
  });
});
