import { Client } from "./Client";

export const FirstIsolated = (): JSX.Element => {
  return (
    <div className="h-screen w-screen p-10 bg-[#0b1120] text-white">
      <h1 className="text-3xl font-semibold">First Isolated Page</h1>

      <div className="my-4 flex gap-4">
        <Client name="Client 1" />
        <Client name="Client 2" />
        <Client name="Client 3" />
      </div>
    </div>
  );
};