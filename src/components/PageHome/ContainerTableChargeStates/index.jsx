import { useEffect, useState } from "react";
import TableChargeStates from "../TableChargeStates";
import objects from "./objects";
import "./style.css";
import useHome from "../../../hooks/useHome";

function ContainerTableChargeStates() {
  const { billingTableData } = useHome();

  const [chargeTableStates, setChargeTableStates] = useState(objects.infoChangesStates);

  useEffect(() => {

    setChargeTableStates(prevState => ({
      ...prevState,
      expired: {
        ...prevState.expired,
        total: billingTableData.expired.length || 0,
        rows: billingTableData.expired
      },
      pending: {
        ...prevState.pending,
        total: billingTableData.pending.length || 0,
        rows: billingTableData.pending
      },
      paid: {
        ...prevState.paid,
        total: billingTableData.paid.length || 0,
        rows: billingTableData.paid
      }
    }));

  }, [billingTableData]);

  return (
    <div className='clients-bills flex-row justify-center margin-t-24'>
      {
        Object.entries(chargeTableStates).map(([key, value]) =>
          <TableChargeStates key={key} infoCharge={value} />
        )
      }
    </div>
  );
}

export default ContainerTableChargeStates;
