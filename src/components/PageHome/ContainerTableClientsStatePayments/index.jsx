import { useEffect, useState } from "react";
import useHome from "../../../hooks/useHome";
import TableClientsStatePayments from "../TableClientsStatePayments";
import objects from "./objects";
import "./style.css";

function ContainerTableClientsStatePayments() {
  const { clientList } = useHome();

  const [tableClientsState, setTableClientsState] = useState(objects.infoChangesStates);

  const totalPaidClients = [];
  const totalExpiredClients = [];

  clientList.map((client) => {
    if (client.defaulter) {
      totalExpiredClients.push(client);
    } else {
      totalPaidClients.push(client);
    }
  });

  useEffect(() => {

    setTableClientsState(prevState => ({
      ...prevState,
      expired: {
        ...prevState.expired,
        total: totalExpiredClients.length || 0,
        rows: totalExpiredClients
      },
      paid: {
        ...prevState.paid,
        total: totalPaidClients.length || 0,
        rows: totalPaidClients
      }
    }));

  }, [clientList]);

  return (
    <div className='clients-bills flex-row justify-center margin-t-24'>
      {
        Object.entries(tableClientsState).map(([key, value]) =>
          <TableClientsStatePayments key={key} infoClient={value} />
        )
      }
    </div>
  );
}

export default ContainerTableClientsStatePayments;
