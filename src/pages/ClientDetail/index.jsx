import { useState } from "react";
import Page from "../../components/General/Page";
import DetailClient from "../../components/PageClientDetail/DetailClient";
import "./style.css";

function ClientDetailPage() {
  const [validateSideBar, setValidateSideBar] = useState(1);

  return (
    <Page validateSideBar={validateSideBar} setValidateSideBar={setValidateSideBar}>
      <DetailClient />
    </Page>
  );
}

export default ClientDetailPage;
