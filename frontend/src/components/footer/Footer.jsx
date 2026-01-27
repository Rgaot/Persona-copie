import "./Footer.css";

import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

function Footer() {
  return (
    <>
      <footer id="footer-container">
        <p id="footer-copyright-icon"> &#9400;</p>
        <Link
          id="footer-discord-link-container"
          target="_blank"
          to="https://discord.gg/tN8H4DeXdZ"
        >
          <p id="footer-discord-label">Discord</p>
          <ArrowUpRight className="footer-links-arrows-icon" />
        </Link>
        <Link
          id="footer-tiktok-link-container"
          target="_blank"
          to="https://www.tiktok.com/@vikmorsona"
        >
          <p id="footer-tiktok-label">Tiktok</p>
          <ArrowUpRight className="footer-links-arrows-icon" />
        </Link>
        <Link
          id="footer-youtube-link-container"
          target="_blank"
          to="https://www.youtube.com/@vikmorsona"
        >
          <p id="footer-youtube-label">Youtube</p>
          <ArrowUpRight className="footer-links-arrows-icon" />
        </Link>
      </footer>
    </>
  );
}

export default Footer;
