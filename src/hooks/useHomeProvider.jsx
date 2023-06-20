import { useState } from "react";
import objectsChargeStates from "../components/PageHome/TableChargeStates/objects";

function useHomeProvider() {
  const [chargeList, setChargesList] = useState([]);
  const [showAllClients, setShowAllClients] = useState(true);
  const [isModalEditUser, setIsModalEditUser] = useState(false);
  const [isModalChargeDetail, setIsModalChargeDetail] = useState(false);
  const [isModalRegisterCharge, setIsModalRegisterCharge] = useState(false);
  const [isModalRegisterClient, setIsModalRegisterClient] = useState(false);
  const [isModalDeleteCharge, setIsModalDeleteCharge] = useState(false);
  const [isModalEditRegisterClient, setIsModalEditRegisterClient] = useState(false);
  const [updateRender, setUpdateRender] = useState(false);
  const [currentClient, setCurrentClient] = useState(false);
  const [currentCharge, setCurrentCharge] = useState(false);
  const [customersFromCustomersPageTable, setCustomersFromCustomersPageTable] = useState([]);
  const [isCustomerTableSearchNotFound, setIsCustomerTableSearchNotFound] = useState(false);
  const [isBillingTableLookupNotFound, setIsBillingTableLookupNotFound] = useState(false);

  const [billingTableData, setBillingTableData] = useState(objectsChargeStates.billingTableData);

  const [clientList, setClientList] = useState([]);
  const [formProfile, setFormProfile] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });

  const [updatedUser, setUpdatedUser] = useState(true);
  const [clientDetail, setClientDetail] = useState();

  const [isModalEditRegisterCharge, setIsModalEditRegisterCharge] = useState(false);

  const [isPopup, setIsPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  return {
    setClientDetail,
    clientDetail,

    isModalRegisterCharge,
    setIsModalRegisterCharge,

    currentClient,
    setCurrentClient,

    isModalEditRegisterClient,
    setIsModalEditRegisterClient,
    isModalRegisterClient,
    setIsModalRegisterClient,
    isModalEditRegisterCharge,
    setIsModalEditRegisterCharge,
    isModalDeleteCharge,
    setIsModalDeleteCharge,

    isPopup,
    setIsPopup,

    popupMessage,
    setPopupMessage,

    chargeList,
    setChargesList,
    isBillingTableLookupNotFound,
    setIsBillingTableLookupNotFound,

    billingTableData,
    setBillingTableData,

    clientList,
    setClientList,

    customersFromCustomersPageTable,
    setCustomersFromCustomersPageTable,
    isCustomerTableSearchNotFound,
    setIsCustomerTableSearchNotFound,

    showAllClients,
    setShowAllClients,
    formProfile,
    setFormProfile,

    updatedUser,
    setUpdatedUser,
    isModalEditUser,
    setIsModalEditUser,

    isModalChargeDetail,
    setIsModalChargeDetail,
    currentCharge,
    setCurrentCharge,

    updateRender,
    setUpdateRender,
  };
}

export default useHomeProvider;
