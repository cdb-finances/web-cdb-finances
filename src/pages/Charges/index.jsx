import { useState } from "react";
import Page from "../../components/General/Page";
import Charges from "../../components/PageCharges/Charges";
import "./style.css";

function ChargesPage() {
  const [validateSideBar, setValidateSideBar] = useState(2);

  return (
    <Page  validateSideBar={validateSideBar} setValidateSideBar={setValidateSideBar}>
      <Charges />
    </Page>
  );
}

export default ChargesPage;
