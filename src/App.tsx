import "./App.css";
import Navbar from "./components/Navbar";
import OrderedNews from "./components/OrderedNews";
import RankedNews from "./components/RankedNews";
import { SelectionProvider } from "./context/SelectionContext";

function App() {
  return (
    <div className="bg-black relative text-white">
      <div
        className="container max-md:px-[16px] mx-auto pb-[32px] md:px-[30px] xl:px-0"
        style={{ maxWidth: "1300px" }}
      >
        <Navbar />
       <SelectionProvider>

       <RankedNews />
       <OrderedNews />
       </SelectionProvider>
     
      </div>
    </div>
  );
}

export default App;
