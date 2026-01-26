import './Home.css'

import Header from "../../components/header/Header";
import Footer from '../../components/footer/Footer';
import NavMenu from "../../components/navMenu/NavMenu.jsx";

import { useNavMenuStore } from "../../store/navMenuStore.js";

function Home() {
  const { isNavMenuOpen } = useNavMenuStore();

  return (
    <>
      <header>
        <Header />
      </header>
      <main id="home-page-main-container" style={isNavMenuOpen ? {gridTemplateColumns: "170px 1fr"} : {}}>
        {isNavMenuOpen && <NavMenu />}
        <div id="home-page-presentation-container">
          <h1 id="home-page-presentation-title">Présentation</h1>
          <p id="home-page-presentation-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            debitis cupiditate velit quod eligendi sunt tenetur dicta ducimus
            incidunt necessitatibus, ex consequatur quas corrupti consectetur
            dolore dignissimos ullam quaerat! Optio!
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
