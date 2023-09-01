import { Button, Card, Elevation } from '@blueprintjs/core';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './HomeView.css';

function HomeView() {
  return (
    <div className="homeView">
      <h1>Welcome to D&amp;DBase!</h1>
      <p className="introText">
        D&amp;DBase is <b>the</b> place for all Players and Dungeon Masters running a 5th edition game. We provide tools
        that make preparing sessions and looking up things much easier than ever before!
      </p>
      <div className="cardList">
        <Card className={classNames('overviewCard', 'itemsCard')} interactive={true} elevation={Elevation.TWO}>
          <h5>
            <NavLink to={'/items'}> Magic Item List</NavLink>
          </h5>
          <p>Explore over 1000 items from the Dungeons &amp; Dragons universe.</p>
          <NavLink to={'/items'}>
            <Button className="navButton">Explore Items</Button>
          </NavLink>
        </Card>
        <Card className={classNames('overviewCard', 'storesCard')} interactive={true} elevation={Elevation.TWO}>
          <h5>
            <NavLink to={'/merchants'}>Store Inventory Generator</NavLink>
          </h5>
          <p>Generate (and optionally print) store inventories that actually make sense!</p>
          <NavLink to={'/merchants'}>
            <Button className="navButton">Create a Store</Button>
          </NavLink>
        </Card>
      </div>
    </div>
  );
}

export default HomeView;
