import "./Footer.css";

import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

function Footer() {
  return (
    <>
      <footer id="footer-container">
        <Link id="footer-discord-link-container" to="https://youtube.com">
          <p id="footer-discord-label">Discord</p>
          <ArrowUpRight className="footer-links-arrows-icon" />
        </Link>
        <Link id="footer-tiktok-link-container" to="https://youtube.com">
          <p id="footer-tiktok-label">Tiktok</p>
          <ArrowUpRight className="footer-links-arrows-icon" />
        </Link>
      </footer>
    </>
  );
}

export default Footer;
