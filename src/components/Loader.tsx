interface LoaderProps {
  rows?: number; 
  widths?: string[]; 
}

const Loader: React.FC<LoaderProps> = ({
  rows = 3,
  widths = ["10%", "80%", "10%", "10%"]
}) => {
  return (
    <div className="space-y-4 mt-4">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="animate-pulse flex items-center text-center gap-[10px]">
          {widths.map((width, colIndex) => (
            <div key={colIndex} className="h-4 bg-[#ffffff0f]" style={{ width }}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Loader;
