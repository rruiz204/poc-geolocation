import { useState, useRef } from "react";
import { useSocketContract } from "./useSocketContract";
import { HubConnection, HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";

export const useSocket = (): useSocketContract => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socket = useRef<HubConnection | null>(null);

  const connect = async (url: string) => {
    if (socket.current) return;

    socket.current = new HubConnectionBuilder().withUrl(url, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }).build();

    await socket.current.start();
    setIsConnected(true);
  };

  const disconnect = async () => {
    if (isConnected) {
      socket.current?.stop();
      setIsConnected(false)
    };
  };

  const listen = <T>(event: string, callback: (model: T) => void) => {
    socket.current?.on(event, callback);
  };

  const send = async <T>(event: string, args: T) => {
    if (isConnected) await socket.current?.invoke(event, args);
  };

  return Object.freeze({ connect, disconnect, listen, send })
};