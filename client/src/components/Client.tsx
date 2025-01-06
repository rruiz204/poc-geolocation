import { ClientList } from "./ClientList";
import { useState, useEffect } from "react";
import { useSocket } from "../sockets/useSocket";
import { Client as ClientModel } from "../models/Client";
import { GenerateCoords } from "../utils/GenerateCoords";


interface Props {
  name: string;
}

export const Client = ({ name }: Props): JSX.Element => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const { isConnected, connect, disconnect, listen, send } = useSocket();


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
      const { lat, lon } = GenerateCoords()
      await send<ClientModel>("SendCoords", { name, latitude: lat, longitude: lon });
    }, 3000);

    const handleCoords = (model: ClientModel) => {
      setClients(prevClients => {
        const existingClientIndex = prevClients.findIndex(c => c.name === model.name);

        if (existingClientIndex === -1) {
          return [...prevClients, model];
        };
        
        return prevClients.map((c, i) =>
          i === existingClientIndex ? model : c
        );
      });
    };

    listen<ClientModel>("ReceiveCoords", handleCoords);

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
          : <ClientList clients={clients} />
        }
      </div>
    </div>
  );
};