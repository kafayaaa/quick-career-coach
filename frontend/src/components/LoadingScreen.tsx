import { BiLoaderAlt } from "react-icons/bi";

export const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center text-3xl font-bold">
      <BiLoaderAlt className="animate-spin" /> Loading...
    </div>
  );
};
