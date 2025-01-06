import { useState, useEffect } from "react";
import { ClientsList } from "./ClientsList";
import { useSocket } from "../sockets/useSocket";
import { Client as ClientModel } from "../models/Client";

interface Props {
  name: string;
};

export const Client = ({ name }: Props): JSX.Element => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const { isConnected, connect, disconnect, listen, send } = useSocket();

  listen<ClientModel>("ReceiveCoords", (model) => {
    const existingClient = clients.find((c) => c.name === model.name);

    if (!existingClient) {
      setClients([...clients, model]);
    } else {
      setClients(clients.map((c) => c.name === model.name ? model : c));
    };
  });


  useEffect(() => {
    const SetupSocketConnnection = async () => {
      await connect("http://localhost:8000/coord-hub");
      await send<ClientModel>("SendCoords", { name, latitude: 20.2323, longitude: 20.7878 });
    };

    SetupSocketConnnection();
    return () => { disconnect() };
  }, []);


  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(async () => {
      await send<ClientModel>("SendCoords", { name, latitude: 20.2323, longitude: 20.7878 });
    }, 5000)

    return () => { clearInterval(interval) };
  }, [isConnected]);

  return (
    <div className="p-5 text-white border-2 border-white rounded-md flex flex-col gap-y-3">
      <p>{name}</p>
      <hr />

      <div className="border-2 rounded-md p-4">
        <p className="text-center">Other Clients List</p>
        <hr className="mb-3" />

        {clients.length == 0
          ? <p>No clients available</p>
          : <ClientsList clients={clients} />
        }
      </div>
    </div>
  );
};