import { useEffect, useState } from "react";
import { ClientsList } from "./ClientsList";
import { useSocket } from "../sockets/useSocket";
import { Client as ClientModel } from "../models/Client";
import { GenerateCoords } from "../utils/GenerateCoords";

interface Props {
  name: string;
};

export const Client = ({ name }: Props): JSX.Element => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const { connect, disconnect, send, listen, connected } = useSocket();

  useEffect(() => {
    const SetupEffects = async () => {
      await connect("http://localhost:8000/coord-hub");
      console.log(`successfully connected to the server | ${name}`);

      const { lat, lon } = GenerateCoords();

      await send<ClientModel>("SendCoords", { name, latitude: lat, longitude: lon });
      console.log(`sending coords from ${name}...`);
    };

    SetupEffects();

    return () => { disconnect() };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (connected) {
        const { lat, lon } = GenerateCoords();

        await send<ClientModel>("SendCoords", { name, latitude: lat, longitude: lon });
        console.log(`sending coords from ${name}...`);
      };
    }, 5000)

    return () => { clearInterval(interval) };
  }, [connected]);

  useEffect(() => {
    listen<ClientModel>("ReceiveCoords", (model) => {
      console.log(`received coords from ${model.name} | ${model.latitude}, ${model.longitude}`);
      const existingClient = clients.find((c) => c.name === model.name);

      if (!existingClient) {
        setClients([...clients, model]);
      } else {
        setClients(clients.map((c) => c.name === model.name ? model : c));
      };
    });
  });


  return (
    <div className="p-5 text-white border-2 border-white rounded-md flex flex-col gap-y-3">
      <p>{name}</p>

      <hr />

      <div className="border-2 rounded-md p-4">
        <p className="text-center">Other Clients List</p>
        <hr className="mb-3" />

        {
          clients.length == 0
            ? <p>No clients available</p>
            : <ClientsList clients={clients} />
        }
      </div>
    </div>
  );
};