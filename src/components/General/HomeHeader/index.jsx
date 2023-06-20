import { useState } from "react";
import useHome from "../../../hooks/useHome";
import ModalHomeEditUserLogOut from "../ModalHomeEditUserLogOut";
import arrowDown from './assets/chevron-down.svg';
import { useNavigate } from 'react-router-dom';
import "./style.css";

function HomeHeader({ validateSideBar }) {
  const navigate = useNavigate();

  const [activeModalHomeEditUser, setActiveModalHomeEditUser] = useState(false);
  const { formProfile, showAllClients, setShowAllClients } = useHome();

  const firstLetter = formProfile.name.toUpperCase()[0]

  function backToAllClients() {
    navigate('/clients/all');
    setShowAllClients(true);
  }

  return (
    <div className="bg-header">
      <div className="content-header gray1 title1 flex-row align-center justify-between">
        <div>
          {validateSideBar === 0 && <span className="title1">Resumo das cobranças</span>}
          {validateSideBar === 1 &&
            <div
              className="clients header-txt green"
              id="downline"
              onClick={backToAllClients}
            >
              {showAllClients ?
                <span>Cliente</span> :
                <div style={{ cursor: 'pointer', gap: '12px' }} className="flex-row">
                  <span>Cliente</span>
                  <span className="gray6">{'>'}</span>
                  <span className="gray6">Detalhamento do cliente</span>
                </div>
              }
            </div>
          }
          {validateSideBar === 2 && <span className="clients title4 green" id="downline">Cobranças</span>}
        </div>
        <div className="flex-row align-center profile-bar">
          <div className="profile flex-row justify-center align-center green" >
            <span>{firstLetter}</span>
          </div>
          <span className="subtitle-login green">{formProfile.name}</span>
          <div onClick={() => setActiveModalHomeEditUser(!activeModalHomeEditUser)}>
            <img src={arrowDown} alt="Ver menu" />
          </div>
        </div>
      </div>
      {activeModalHomeEditUser && <ModalHomeEditUserLogOut />}
    </div>
  );
}

export default HomeHeader;
