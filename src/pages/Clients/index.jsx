import { useState } from "react";
import Page from "../../components/General/Page";
import Clients from "../../components/PageClients/Clients";
import "./style.css";

function ClientsPage() {
  const [validateSideBar, setValidateSideBar] = useState(1);

  return (
    <Page  validateSideBar={validateSideBar} setValidateSideBar={setValidateSideBar}>
      <Clients />
    </Page>
  );
}

export default ClientsPage;
