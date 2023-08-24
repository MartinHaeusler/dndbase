import { Classes } from "@blueprintjs/core";
import "./App.css";
import NavigationBar from "navigationbar/NavigationBar";
import { Routes, Route } from "react-router-dom";
import HomeView from "views/home/HomeView";
import ItemsView from "views/items/ItemsView";
import MerchantsView from "views/merchants/MerchantsView";

function App() {
  return (
    <div className={"app " + Classes.DARK}>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/items" element={<ItemsView />} />
        <Route path="/merchants" element={<MerchantsView />} />
      </Routes>
    </div>
  );
}

export default App;
