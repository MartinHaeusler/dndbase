import { Classes } from '@blueprintjs/core';
import './App.css';
import NavigationBar from 'navigationbar/NavigationBar';
import { Routes, Route } from 'react-router-dom';
import HomeView from 'views/home/HomeView';
import ItemsView from 'views/items/ItemsView';
import StoresView from 'views/stores/StoresView';
import classNames from 'classnames';

function App() {
  return (
    <div className={'app ' + Classes.DARK}>
      <NavigationBar />
      <div className="appContent">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/items" element={<ItemsView />} />
          <Route path="/merchants" element={<StoresView />} />
        </Routes>
      </div>
      <div className={classNames('appFooter', 'noPrint')}>I'm the footer</div>
    </div>
  );
}

export default App;
