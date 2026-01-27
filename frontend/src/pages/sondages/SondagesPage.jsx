import "./SondagesPage.css";

import Header from "../../components/header/Header";
import NavMenu from "../../components/navMenu/NavMenu";

import { useNavMenuStore } from "../../store/navMenuStore.js";
import { useSondagesStore } from "../../store/sondageStore.js";

import { useEffect } from "react";

function SondagesPage() {
  const { isNavMenuOpen } = useNavMenuStore();
  const { getOptions, isGettingSondagesOptions, sondagesOptions } =
    useSondagesStore();

  useEffect(() => {
    getOptions();
  }, []);

  if (isGettingSondagesOptions) {
    return <div>Loading...</div>;
  }

  if (!isGettingSondagesOptions) {
    return (
      <>
        <header>
          <Header />
        </header>
        <main
          id="sondages-page-main-container"
          style={
            isNavMenuOpen
              ? { gridTemplateColumns: "170px 1fr" }
              : { gridTemplateColumns: "1fr" }
          }
        >
          {isNavMenuOpen && <NavMenu />}
          <div id="sondages-page-main-content">
            <div id="sondages-page-sondage-info-container"></div>
            <div id="sondages-page-sondage-container">
              <div id="sondages-page-sondage-question-container">
                <p id="sondages-page-sondage-question">
                  Quel est votre liscence persona préféré ?
                </p>
              </div>
              <div id="sondages-page-sondage-options-container">
                {sondagesOptions.option.map((sondage) => (
                  <div
                    key={sondage}
                    className="sondages-page-sondage-option-container"
                  >
                    <p className="sondages-page-sondage-option">{sondage}</p>
                  </div>
                ))}
              </div>
              <div id="sondages-page-sondage-submit-container">
                <button id="sondages-page-sondage-submit-button">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default SondagesPage;
