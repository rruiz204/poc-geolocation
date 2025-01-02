import { useEffect } from "react";
import { useSocket } from "../sockets/useSocket";

export const Ping = (): JSX.Element => {
  const { connect, disconnect } = useSocket();

  useEffect(() => {
    connect("http://localhost:8000/ping-hub");

    console.log("successfully connected to the server");

    return () => {disconnect()};
  }, []);

  return (
    <div className="h-screen w-screen p-10 bg-[#0b1120] text-white">
      <h1 className="text-3xl font-semibold">Ping Page</h1>
    </div>
  );
};