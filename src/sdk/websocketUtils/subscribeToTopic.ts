import { Observable, Observer } from "rxjs";
import { shareReplay, switchMap } from "rxjs/operators";
import * as socketIO from "socket.io-client";

const subscribeToWS: Observable<SocketIOClient.Socket> = Observable.create(
  (observer: Observer<SocketIOClient.Socket>) => {
    const socket = socketIO.connect("ws://localhost:8080", {
      transports: ["websocket"],
    });

    observer.next(socket);
    return () => {
      socket.disconnect();
    };
  },
).pipe(shareReplay(1));

const subscribeToTopic = <T>(topic: string): Observable<T> => {
  return subscribeToWS.pipe(
    switchMap(socket =>
      Observable.create((incoming: Observer<T>) => {
        const handler = (data: T) => {
          incoming.next(data);
        };
        socket.on(topic, handler);
        return () => {
          socket.off(topic, handler);
        };
      }),
    ),
  ) as Observable<T>;
};

export default subscribeToTopic;
