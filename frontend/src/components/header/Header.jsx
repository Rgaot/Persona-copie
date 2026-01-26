import { Link } from "react-router";

import "./Header.css";

import { LogOut, Menu } from "lucide-react";

import { useNavMenuStore } from "../../store/navMenuStore.js";
import { useAuthStore } from "../../store/authStore.js";

function Header() {
  const { isNavMenuOpen, openNavMenu, closeNavMenu } = useNavMenuStore();
  const { logout, authUser } = useAuthStore();

  const handleNavMenuClick = () => {
    if (isNavMenuOpen) {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <header id="main-header-container">
        <div id="nav-icon-container">
          <Menu id="main-header-nav-icon" onClick={handleNavMenuClick} />
        </div>
        <div id="main-header-title-container">
          <h1 id="main-header-title">Persona</h1>
        </div>
        <div id="main-header-profile-logout-container">
          <Link to="/profile">
            <img
              src={ authUser?.profileImage ||"avatar.png"}
              alt="Profile Image"
              id="main-header-user-profile-image"
            />
          </Link>

          <div>
            <LogOut id="main-header-logout-icon" onClick={handleLogout} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
