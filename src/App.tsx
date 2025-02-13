import "./App.css";
import DateSelector from "./components/DateSelector";
import Navbar from "./components/Navbar";
import OrderedNews from "./components/OrderedNews";
import RankedNews from "./components/RankedNews";
import NewsControls from "./components/NewsControls";

function App() {
  return (
    <div className="bg-black relative text-white">
      <div
        className="container max-md:px-[16px] mx-auto pb-[32px] md:px-[30px] xl:px-0"
        style={{ maxWidth: "1300px" }}
      >
        <Navbar />
        <RankedNews />
        <OrderedNews />
        <NewsControls/>
        <DateSelector/>
      </div>
    </div>
  );
}

export default App;
