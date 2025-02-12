import React, { FC } from "react";

const SkeletonError = () => {
  return (
    <div className="animate-pulse flex flex-col items-center text-center gap-[10px] mt-4">
      <div className="h-8 w-full  bg-[#232323] "></div>
      {/* other color bg-gray-300 */}
      <div className="h-8 w-full  bg-[#232323] "></div>
      <div className="h-8 w-full bg-[#232323] "></div>
    </div>
  );
};

export default SkeletonError;
