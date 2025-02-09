import "./App.css";
import Navbar from "./components/Navbar";
import OrderedNews from "./components/OrderedNews";
import Popup from "./components/Popup";
import RankedNews from "./components/RankedNews";

function App() {
  return (
    <div className="bg-black relative text-white">
      <div className="container mx-auto" style={{ maxWidth: "1300px" }}>
        <Navbar />
        <RankedNews />
        <OrderedNews />
      </div>
    </div>
  );
}

export default App;
