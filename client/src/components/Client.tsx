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
  const { connect, disconnect, send, listen } = useSocket();


  listen<ClientModel>("ReceiveCoords", (model) => {
    console.log(`received coords from ${model.name} | ${model.latitude}, ${model.longitude}`);

    const existingClient = clients.find((c) => c.name === model.name);

    if (!existingClient) setClients([...clients, model]);

    else setClients(clients.map((c) => c.name === model.name ? model : c));
  });


  useEffect(() => {
    connect("http://localhost:8000/coord-hub");

    console.log(`successfully connected to the server | ${name}`);

    return () => {disconnect()};
  }, []);


  const SendCoordsHandler = async () => {
    const { lat, lon } = GenerateCoords();
    console.log(`coords generated ${lat}, ${lon}`);

    await send<ClientModel>("SendCoords", { name, latitude: lat, longitude: lon });
    console.log("sending coords...");
  };


  return (
    <div className="p-5 text-white border-2 border-white rounded-md flex flex-col gap-y-3">
      <p>{name}</p>

      <div className="border-2 rounded-md p-4 hover:bg-[#1f2937] duration-200">
        <button className="w-full font-semibold" onClick={SendCoordsHandler}>Send Coords</button>
      </div>

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