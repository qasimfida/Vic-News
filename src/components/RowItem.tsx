import React from "react";
interface RowItemProps {
  key?: number;
  sno: string;
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
        className={`md:flex hover:border hover:border-white grid text-sm md:text-md font-medium py-[6px]  grid-cols-[40px,1fr] grid-rows-[auto,auto,auto] text-${textColor}  `}
        onClick={handleClick}
        key={key}
      >
        <p className="md:mr-[7px] row-start-1 col-start-1 ">{sno + ")"}</p>
        <p className={`md:w-[84%] row-start-1 col-start-2 text-${paraColor}`}>
          {text}
        </p>
        <div className="md:w-[15%] col-span-2 flex justify-between">
          <p className={`text-red  text-${bnColor}`}>{bn}</p>
          <p className={`text-yellow text-${timeColor}`}>{time}</p>
        </div>
      </div>
    </>
  );
};
export default RowItem;
