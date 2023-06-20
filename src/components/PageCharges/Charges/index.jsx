import "./style.css";
import useHome from "../../../hooks/useHome";
import HeaderChargesTable from '../../PageCharges/HeaderChargesTable';
import ChargesTable from '../../PageCharges/ChargesTable';
import ModalRegisterClient from '../../General/ModalRegisterClient';
import Popup from '../../General/Popup';
import ModalRegisterCharge from '../../General/ModalRegisterCharge';
import ModalEditRegisterCharge from "../../General/ModalEditRegisterCharge";
import { useEffect } from 'react';
import ModalChargeDetail from "../../General/ModalChargeDetail";

function Charges() {

  const { isModalRegisterClient, isPopup, setIsPopup,
    isModalRegisterCharge, isModalChargeDetail, isModalEditRegisterCharge } = useHome();

  useEffect(() => {
    setTimeout(() => {
      setIsPopup(false)
    }, 2000);
  }, [isPopup])

  return (
    <div className='container-clients'>
      <HeaderChargesTable />
      <ChargesTable />
      {isModalRegisterClient && <ModalRegisterClient />}

      {isPopup && <Popup />}
      {isModalRegisterCharge && <ModalRegisterCharge />}
      {isModalChargeDetail && <ModalChargeDetail />}
      {isModalEditRegisterCharge && <ModalEditRegisterCharge />}
    </div>
  );
};

export default Charges;