import { Classes } from '@blueprintjs/core';
import './App.css';
import NavigationBar from 'navigationbar/NavigationBar';
import { Routes, Route } from 'react-router-dom';
import HomeView from 'views/home/HomeView';
import ItemsView from 'views/items/ItemsView';
import StoresView from 'views/stores/StoresView';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

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
      <div className={classNames('appFooter', 'noPrint')}>
        <span style={{ fontSize: '0.7em' }}>All data was collected from public websites.</span>
        <a href="mailto:feedback.dndbase@gmail.com?subject=Bug Report">
          <FontAwesomeIcon icon={faBug} /> Report a bug
        </a>
      </div>
    </div>
  );
}

export default App;
