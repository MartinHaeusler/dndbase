import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import { faDAndD } from '@fortawesome/free-brands-svg-icons';
import { faBox, faHome, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css';
import classNames from 'classnames';

function NavigationBar() {
  return (
    <Navbar className={classNames('mainNavigationBar', 'noPrint', Classes.DARK)}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading className="outline">
          <FontAwesomeIcon icon={faDAndD} size="xl" style={{ stroke: 'black', strokeWidth: '10' }} />
          <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>D&amp;DBase</span>
        </NavbarHeading>
        <NavbarDivider />
        <NavLink
          to="/"
          className={({ isActive }) => classNames({ activeNavLink: isActive, inactiveNavLink: !isActive })}
        >
          <Button
            className="bp5-minimal"
            icon={<FontAwesomeIcon icon={faHome} />}
            text="Home"
            // href="/"
          />
        </NavLink>
        <NavLink
          to="/items"
          className={({ isActive }) => classNames({ activeNavLink: isActive, inactiveNavLink: !isActive })}
        >
          <Button
            className="bp5-minimal"
            icon={<FontAwesomeIcon icon={faBox} />}
            text="Items"
            // href="/items"
          />
        </NavLink>
        <NavLink
          to="/merchants"
          className={({ isActive }) => classNames({ activeNavLink: isActive, inactiveNavLink: !isActive })}
        >
          <Button
            className="bp5-minimal"
            icon={<FontAwesomeIcon icon={faStore} />}
            text="Merchants"
            // href="/merchants"
          />
        </NavLink>
      </NavbarGroup>
    </Navbar>
  );
}

export default NavigationBar;
