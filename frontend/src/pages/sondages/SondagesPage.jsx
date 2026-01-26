import "./SondagesPage.css";

import Header from "../../components/header/Header";
import NavMenu from "../../components/navMenu/NavMenu";

import { useNavMenuStore } from "../../store/navMenuStore.js";
import { useSondagesStore } from "../../store/sondageStore.js";
import { useEffect, useState } from "react";

function SondagesPage() {
  const { isNavMenuOpen } = useNavMenuStore();
  const { getOptions } = useSondagesStore();
  const [sondagesOptions, setSondagesOptions] = useState([])

  useEffect(() => {
    getOptions().then((sondagesOptions) => {
      setSondagesOptions(sondagesOptions)
    })
    
  }, [getOptions]);
  console.log(sondagesOptions)
  
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
          <div id="sondages-page-sondage-info-container">
            
          </div>
          <div id="sondages-page-sondage-container">
            
          </div>
        </div>
      </main>
    </>
  );
}

export default SondagesPage;
