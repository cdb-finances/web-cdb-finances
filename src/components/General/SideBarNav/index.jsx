import useHome from "../../../hooks/useHome";
import clientesGray from "./assets/clientes-gray.svg";
import clientesPink from "./assets/clientes-pink.svg";
import cobrancaGray from "./assets/cobrancas-gray.svg";
import cobrancaPink from "./assets/cobrancas-pink.svg";
import homeGray from "./assets/home-gray.svg";
import homePink from "./assets/home-pink.svg";
import './style.css';
import { useNavigate } from 'react-router-dom';
import api from "../../../services/api";
import { getItem } from "../../../utils/storage";

function SideBarNav({ validateSideBar, setValidateSideBar }) {
  const navigate = useNavigate();

  const { setBillingTableData, setShowAllClients } = useHome();

  const getChargeByStatus = async () => {
    try {
      const { data: charges } = (await api.get('/charge/status', { headers: { Authorization: `Bearer ${getItem("token")}`, } }));

      setBillingTableData(charges);

    } catch (error) {
      console.log(error);
      return;
    }
  }

  const handleBtnGoHome = () => {
    setValidateSideBar(0);
    navigate('/home');
    getChargeByStatus();
  }

  const handleBtnGoClients = () => {
    setValidateSideBar(1);
    setShowAllClients(true);
    navigate('/clients/all');
  }

  const handleBtnGoCharges = () => {
    setValidateSideBar(2);
    navigate('/charges/all');
  }

  return (
    <div className="side-bar-nav flex-column bg-gray7">
      <div className='menu flex-column justify-between align-center'>
        <div className={validateSideBar === 0 ? 'item flex-column justify-between align-center border' : 'item flex-column justify-between align-center'}
          onClick={handleBtnGoHome}>
          <img src={validateSideBar === 0 ? homePink : homeGray} alt='Home'></img>
          <span className={validateSideBar === 0 ? 'pink' : 'gray1'}>Home</span>
        </div>
        <div className={validateSideBar === 1 ? 'item flex-column justify-between align-center border' : 'item flex-column justify-between align-center'}
          onClick={handleBtnGoClients}>
          <img src={validateSideBar === 1 ? clientesPink : clientesGray} alt='Clientes'></img>
          <span className={validateSideBar === 1 ? 'pink' : 'gray1'}>Clientes</span>
        </div>
        <div className={validateSideBar === 2 ? 'item flex-column justify-between align-center border' : 'item flex-column justify-between align-center'}
          onClick={handleBtnGoCharges}>
          <img src={validateSideBar === 2 ? cobrancaPink : cobrancaGray} alt='Cobranças'></img>
          <span className={validateSideBar === 2 ? 'pink' : 'gray1'}>Cobranças</span>
        </div>
      </div>
    </div>
  );
}

export default SideBarNav;
