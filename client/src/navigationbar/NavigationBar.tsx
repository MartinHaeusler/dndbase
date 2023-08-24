import {
  Alignment,
  AnchorButton,
  Classes,
  Icon,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <Navbar className={`mainNavigationBar ${Classes.DARK}`}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <Icon icon="flame" />
          <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
            D&amp;Dbase - Data and Tools for 5e
          </span>
        </NavbarHeading>
        <NavbarDivider />
        <Link to="/">
          <AnchorButton
            className="bp5-minimal"
            icon="home"
            text="Home"
            // href="/"
          />
        </Link>
        <Link to="/items">
          <AnchorButton
            className="bp5-minimal"
            icon="cube"
            text="Items"
            // href="/items"
          />
        </Link>
        <Link to="/merchants">
          <AnchorButton
            className="bp5-minimal"
            icon="shop"
            text="Merchants"
            // href="/merchants"
          />
        </Link>
        <NavbarDivider />
        <div style={{ width: 20 }} />
      </NavbarGroup>
    </Navbar>
  );
}

export default NavigationBar;
