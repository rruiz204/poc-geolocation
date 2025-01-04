import { NavLink } from "react-router";

export const Home = (): JSX.Element => {
  return (
    <div className="h-screen w-screen p-10 bg-[#0b1120] text-white">
      <h1 className="text-3xl font-semibold">Home Page</h1>


      <div className="flex items-center gap-5">
        <div className="p-4 my-4 border-2 border-withe w-max">
          <NavLink to="/ping-ws" className="text-blue-500 underline font-semibold">Go to Ping Web Sockets Page</NavLink>
        </div>
        <div className="p-4 my-4 border-2 border-withe w-max">
          <NavLink to="/ping-rest" className="text-blue-500 underline font-semibold">Go to Ping Rest Page</NavLink>
        </div>
      </div>
    </div>
  );
};