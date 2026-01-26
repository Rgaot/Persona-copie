import "./NavMenu.css";

import {
  MessageSquare,
  House,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import { Link } from "react-router";

function NavMenu() {
  return (
    <>
      <aside id="nav-menu-container">
        <Link id="nav-menu-home-container" to="/">
          <House id="nav-menu-home-icon" />
          <p id="nav-menu-home-label">Home</p>
        </Link>
        <Link id="nav-menu-messages-container" to="/messages">
          <MessageSquare id="nav-menu-messages-icon" />
          <p id="nav-menu-messages-label">Messages</p>
        </Link>
        <Link id="nav-menu-sondages-container" to="/sondages">
          <ChartNoAxesColumnIncreasing id="nav-menu-sondages-icon" />
          <p id="nav-menu-sondages-label">Sondages</p>
        </Link>
      </aside>
    </>
  );
}

export default NavMenu;
