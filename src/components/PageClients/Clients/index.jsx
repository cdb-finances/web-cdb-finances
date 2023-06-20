import useHome from "../../../hooks/useHome";
import { useEffect } from 'react';
import "./style.css";
import ClientesTable from '../ClientsTable';
import HeaderClientesTable from '../HeaderClientsTable';
import Popup from '../../General/Popup'
import ModalRegisterCharge from '../../General/ModalRegisterCharge';
import ModalRegisterClient from '../../General/ModalRegisterClient';
import ModalEditRegisterClient from '../../General/ModalEditRegisterClient';
import ModalEditRegisterCharge from "../../General/ModalEditRegisterCharge";

function Clients() {

  const { isModalRegisterClient, isModalEditRegisterClient, isPopup, setIsPopup, isModalRegisterCharge, setShowAllClients, isModalEditRegisterCharge } = useHome();

  useEffect(() => {
    setTimeout(() => {
      setIsPopup(false)
    }, 2000)
  }, [isPopup])


  return (
    <div className='container-clients'>
      <HeaderClientesTable />
      <ClientesTable setShowAllClients={setShowAllClients} />
      {isPopup && <Popup />}
      {isModalRegisterCharge && <ModalRegisterCharge />}
      {isModalRegisterClient && <ModalRegisterClient />}
      {isModalEditRegisterClient && <ModalEditRegisterClient />}
      {isModalEditRegisterCharge && <ModalEditRegisterCharge />}
    </div>
  );
};

export default Clients;

