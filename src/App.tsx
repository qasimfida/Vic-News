import "./App.css";
import Navbar from "./components/Navbar";
import OrderedNews from "./components/OrderedNews";
import Popup from "./components/Popup";
import RankedNews from "./components/RankedNews";

function App() {
  return (
    <div className="bg-black min-h-screen px-[66px] relative text-white">
      <Navbar />
      <RankedNews />
      <OrderedNews />
    </div>
  );
}

export default App;
