import './style.css';
import closeIcon from './assets/close-icon.svg';
import alertIcon from './assets/alert-icon.svg';
import useHome from '../../../hooks/useHome';
import api from '../../../services/api';
import { getItem } from '../../../utils/storage';

export default function ModalDeleteCharge() {
  const { setIsModalDeleteCharge, currentCharge,
    setIsPopup, setPopupMessage,
    setUpdateRender, updateRender } = useHome()

  const handleDeleteCharge = async () => {
    if (currentCharge.status !== 'pendente') {
      setIsModalDeleteCharge(false)
      setIsPopup(true)
      setPopupMessage('Esta cobrança não pode ser excluída!')
      return
    }

    try {

      await api.delete(`/charge/${currentCharge.id}`, { headers: { Authorization: `Bearer ${getItem("token")}`, } })

      setIsModalDeleteCharge(false)
      setIsPopup(true)
      setPopupMessage('Cobrança excluída com sucesso!')
      setUpdateRender(!updateRender)

    } catch (error) {
      return console.log('erro ao excluir cobrança', error);
    }
  }

  return (
    <div className="modal">
      <div className="modal-delete-charge" style={{ height: '400px' }}>
        <img
          src={closeIcon}
          alt="Icone de fechar modal"
          className='close-modal-delete-charge'
          onClick={() => setIsModalDeleteCharge(false)}
        />
        <div className='container-modal-delete-charge'>
          <img src={alertIcon} alt="Icone de alerta" className='alert-icon' />
          <h3 className='orange title3'>Tem certeza que deseja excluir esta cobrança?</h3>
          <div className='margin-t-24'>
            <button
              className='red2 bg-red2 btn-text btn-not-delete'
              onClick={() => setIsModalDeleteCharge(false)}
            >
              Não
            </button>
            <button
              className='bg-green2 green2 btn-text btn-yes-delete'
              onClick={() => handleDeleteCharge()}
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}