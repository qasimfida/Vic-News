import "./App.css";
import Navbar from "./components/Navbar";
import OrderedNews from "./components/OrderedNews";
import Popup from "./components/Popup";
import RankedNews from "./components/RankedNews";

function App() {
  return (
    <div className="bg-black relative text-white">
      <div
        className="container max-md:px-[16px] mx-auto md:px-[30px] xl:px-0"
        style={{ maxWidth: "1300px" }}
      >
        <Navbar />
        <RankedNews />
        <OrderedNews />
      </div>
    </div>
  );
}



export default App;
