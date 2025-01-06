import { Client } from "../models/Client";

interface Props {
  clients: Client[];
};

export const ClientList = ({ clients }: Props): JSX.Element => {
  return (
    <div className="flex flex-col gap-y-3">
      {
        clients.map((client: Client) => (
          <div key={client.name} className="flex flex-col items-center gap-y-2">
            <p>{client.name}</p>
            <p>{client.latitude}, {client.longitude}</p>
          </div>
        ))
      }
    </div>
  );
};