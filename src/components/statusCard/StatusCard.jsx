import React from "react";
import { StatusCardIconStyle } from "../../styles/IconStyles";

export const StatusCard = ({Icon , title , count}) => {
  return (
    <div className="w-[250px] h-[150px] border boerder-gray-400 shadow-xl rounded p-3 ">
      <div className="w-full h-full flex items-center	gap-2 justify-center flex-col">
        <Icon sx={StatusCardIconStyle} />
        <div className="flex items-center	gap-2 justify-center flex-col">
          
          <p className="text-gray-700 font-bold text-xl">{count}</p>
          <p className="text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};
