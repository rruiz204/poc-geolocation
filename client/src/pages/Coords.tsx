import { Client } from "../components/Client";

export const Coords = (): JSX.Element => {
  return (
    <div className="h-screen w-screen p-10 bg-[#0b1120] text-white">
      <h1 className="text-3xl font-semibold">Coords Page</h1>

      <div className="my-4 flex gap-4">
        <Client name="Client 1" />
        <Client name="Client 2" />
        <Client name="Client 3" />
      </div>
    </div>
  );
};