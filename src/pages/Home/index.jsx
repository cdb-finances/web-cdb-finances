import { useState } from "react";
import Page from "../../components/General/Page";
import Home from "../../components/PageHome/Home";
import "./style.css";

function HomePage() {
  const [validateSideBar, setValidateSideBar] = useState(0);

  return (
    <Page validateSideBar={validateSideBar} setValidateSideBar={setValidateSideBar}>        
      <Home />
    </Page>
  );
}

export default HomePage;
