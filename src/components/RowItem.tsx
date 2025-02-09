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
      className={`flex sajid text-md font-medium mt-[12px] text-${textColor}  `}
      onClick={handleClick}
      key={key}
    >
      <p className="mr-[7px]">{sno + ")"}</p>
      <p className={`w-[84%] text-${paraColor}`}>{text}</p>
      <div className="w-[15%] flex justify-between">
        <p className={`text-red  text-${bnColor}`}>{bn}</p>
        <p className={`text-yellow text-${timeColor}`}>{time}</p>
      </div>
    </div>
    </>
    
  );
};
export default RowItem;
