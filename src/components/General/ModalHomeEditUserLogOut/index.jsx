import { clear } from '../../../utils/storage';
import arrowUp from "./assets/arrowUp.svg";
import { useNavigate } from "react-router";
import './style.css';
import useHome from '../../../hooks/useHome';

function ModalHomeEditUserLogOut() {
  const navigate = useNavigate();
  const { setIsModalEditUser } = useHome();

  function logout() {
    clear();
    navigate('/');
  };

  return (
    <div className='modal-popup flex-column'>
      <div className='arrow-up'>
        <img src={arrowUp} alt="arrowUp" />
      </div>
      <div className='modal-home-edit-user'>
        <div className='flex-row justify-center align-center'>
          <button className='button margin-t-15' onClick={() => setIsModalEditUser(true)}>
          </button>
          <button className='button margin-t-15' onClick={() => logout()} >
          </button>
        </div>
      </div>
    </div >
  );
}

export default ModalHomeEditUserLogOut;
