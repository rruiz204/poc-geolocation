import { useKhaos } from "../khaos/useKhaos";

export const PingRest = (): JSX.Element => {
  const { loading, invoke, data, error } = useKhaos();

  const FetchingDataHandler = async () => {
    await invoke("http://localhost:8000/api/ping-rest");
  };

  const RenderData = () => (
    <div>
      { data && <p>{data}</p> }
      { error && <p>{error}</p> }
    </div>
  );

  return (
    <div className="h-screen w-screen p-10 bg-[#0b1120] text-white">
      <h1 className="text-3xl font-semibold">Ping Rest Page</h1>

      <div className="border-2 rounded-md p-4 hover:bg-[#1f2937] duration-200 w-max my-4">
        <button className="w-full font-semibold" onClick={FetchingDataHandler}>Fetching Data</button>
      </div>

      <div>
        { loading ? <p>loading...</p> : RenderData() }
      </div>
    </div>
  );
};