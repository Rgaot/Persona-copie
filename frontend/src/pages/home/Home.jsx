import "./Home.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import NavMenu from "../../components/navMenu/NavMenu.jsx";

import { useNavMenuStore } from "../../store/navMenuStore.js";

function Home() {
  const { isNavMenuOpen } = useNavMenuStore();

  return (
    <>
      <header>
        <Header />
      </header>
      <main
        id="home-page-main-container"
        style={isNavMenuOpen ? { gridTemplateColumns: "170px 1fr" } : {}}
      >
        {isNavMenuOpen && <NavMenu />}
        <div id="home-page-presentation-container">
          <h1 id="home-page-presentation-title">Présentation</h1>
          <p id="home-page-presentation-text">
            Ce site est fait pour tous les fans de Persona, vous pourrez
            discuter à propos du jeu ainsi que donner vos opinions sur le jeu.
            <br />
            Le but de ce site est de créer une petite commu persona fr. <br />
            N'hésitez pas aussi a me soutenir dans les réseaux sociaux, vous
            avez les liens en bas de la page
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
