import { useEffect } from "react";
import useHome from "../../../hooks/useHome";
import api from '../../../services/api';
import ContainerFrameChargeValues from "../ContainerFrameChargeValues";
import ContainerTableChargeStates from "../ContainerTableChargeStates";
import ContainerTableClientsStatePayments from "../ContainerTableClientsStatePayments";
import './style.css';

function Home() {
  const { setClientList, setBillingTableData } = useHome();

  async function getClientList() {
    const clients = await api.get('/client');
    setClientList([...clients.data]);
  };

  const getChargeByStatus = async () => {
    try {
      const { data: charges } = (await api.get('/charge/status'));

      setBillingTableData(charges);

    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getChargeByStatus();
    getClientList();
  }, []);

  return (
    <>
      <ContainerFrameChargeValues />
      <ContainerTableChargeStates />
      <ContainerTableClientsStatePayments />
    </>
  );
}

export default Home;
