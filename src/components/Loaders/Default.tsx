/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import { IoAperture } from "react-icons/io5";

const DefaultLoader: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <IoAperture className="animate-spin text-5xl text-primary-200" />
    </div>
  );
};

export default DefaultLoader;
