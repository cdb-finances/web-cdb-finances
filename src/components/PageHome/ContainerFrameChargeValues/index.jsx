import { useEffect, useState } from "react";
import api from "../../../services/api";
import FrameChargeValues from "../FrameChargeValues";
import objects from "./objects";
import "./style.css";
import { getItem } from "../../../utils/storage";

function ContainerFrameChargeValues() {
  const [framesCharge, setFramesCharge] = useState(objects.infoFrameCharges);

  const updateCardValues = (totalValuePerStatus) => {
    setFramesCharge(prevState => ({
      ...prevState,
      paid: {
        ...prevState.paid,
        value: totalValuePerStatus.paid
      },
      expired: {
        ...prevState.expired,
        value: totalValuePerStatus.expired
      },
      pending: {
        ...prevState.pending,
        value: totalValuePerStatus.pending
      }
    }));
  }

  const getTheTotalAmountOfEachChargeByStatus = async () => {
    try {
      const { data: totalValuePerStatus } = await api.get("/charge/total-values", { headers: { Authorization: `Bearer ${getItem("token")}`, } });

      updateCardValues(totalValuePerStatus);

    } catch (error) {
      return console.log(error);
    }
  }

  useEffect(() => {
    getTheTotalAmountOfEachChargeByStatus();
  }, []);

  return (
    <div className="container-frame-charge-values flex-row width-100-percent margin-t-19">
      {
        Object.entries(framesCharge).map(([key, value]) =>
          <FrameChargeValues key={key} infoCharge={value} />
        )
      }
    </div>
  );
}

export default ContainerFrameChargeValues;
