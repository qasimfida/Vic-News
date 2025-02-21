import React from "react";
interface RowItemProps {
  key?: number;
  sno: any;
  text: string;
  bn: string;
  time: string;
  bnColor?: string;
  timeColor?: string;
  textColor?: string;
  paraColor?: String;
  handleClick?: () => void;
}

const RowItem: React.FC<RowItemProps> = ({
  key,
  sno,
  text,
  bn,

  time,
  paraColor,
  textColor,
  bnColor = "red",
  timeColor = "yellow",
  handleClick,
}) => {
  return (
    <>
      <div
        className={`flex  max-sm:items-center max-sm:justify-center  text-sm md:text-md font-medium py-[6px] md:px-[16px]  grid-cols-[40px,1fr] grid-rows-[auto,auto,auto] text-${textColor}  `}
        onClick={handleClick}
        key={key}
      >
        <p className="row-start-1 mr-[7px] col-start-1 ">{sno + ")"}</p>
        <p
          className={`md:w-[84%] line-clamp-2 md:line-clamp-1 overflow-hidden text-ellipsis row-start-1 col-start-2 text-${paraColor}`}
        >
          {text}
        </p>
        <div className="md:w-[15%] col-span-2 flex justify-between max-sm:justify-end">
          <p className={`text-red max-sm:hidden text-${bnColor}`}>{bn}</p>
          <p className={`text-yellow max-sm:ml-[7px] text-${timeColor}`}>
            {time}
          </p>
        </div>
      </div>
    </>
  );
};
export default RowItem;
