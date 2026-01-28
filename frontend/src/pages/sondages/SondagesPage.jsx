import "./SondagesPage.css";

import Header from "../../components/header/Header";
import NavMenu from "../../components/navMenu/NavMenu";

import { useNavMenuStore } from "../../store/navMenuStore.js";
import { useSondagesStore } from "../../store/sondageStore.js";

import { useEffect, useState } from "react";

function SondagesPage() {
  const { isNavMenuOpen } = useNavMenuStore();
  const {
    getOptions,
    isGettingSondagesOptions,
    isGettingSondagesResults,
    sondagesOptions,
    sondagesResults,
    vote,
    isVoting,
    getResults,
  } = useSondagesStore();
  const [choice, setChoice] = useState(0);

  useEffect(() => {
    getOptions();
    getResults();
  }, []);

  if (isGettingSondagesOptions) {
    return <div>Loading...</div>;
  }

  if (isVoting) {
    return <div>Chargement...</div>;
  }

  if (isGettingSondagesResults) {
    return <div>Chargement...</div>;
  }

  const handleVote = async () => {
    if (choice === 0) return vote(choice);
    if (!choice) return;
    vote(choice);
  };

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
                  Quel est votre licence persona préféré ?
                </p>
              </div>
              <div id="sondages-page-sondage-options-container">
                {sondagesOptions.option.map((sondage, index) => (
                  <div
                    key={sondage}
                    className="sondages-page-sondage-option-container"
                    onClick={() => {
                      setChoice(index + 1);
                    }}
                  >
                    <p className="sondages-page-sondage-option">{sondage}</p>
                    <p className="sondages-page-sondage-option-percent">{sondagesResults.map((result) => {
                      return result.vote === (index + 1) ? `${result?.percent} %` : ""
                    })}</p>
                  </div>
                ))}
              </div>
              <div
                id="sondages-page-sondage-submit-container"
                onClick={handleVote}
              >
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
