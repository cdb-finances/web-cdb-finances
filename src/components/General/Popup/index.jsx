import './style.css'
import checkedIcon from './assets/checked-icon.svg'
import uncheckedIcon from './assets/unchecked-icon.svg'
import closeIcon from './assets/close-icon.svg'
import closeIconRed from './assets/close-icon-red.svg'
import useHome from '../../../hooks/useHome';

export default function Popup() {
  const { setIsPopup, popupMessage } = useHome();

  return (
    <>
      {popupMessage === 'Esta cobrança não pode ser excluída!' ?
        <div className='popup medium-body bg-red2 red2'>
          <img
            src={uncheckedIcon}
            alt="Icone de não checado"
          />
          {popupMessage}
          <img
            src={closeIconRed}
            alt="Icone de fechar"
            style={{
              cursor: 'pointer'
            }}
            onClick={() => setIsPopup(false)}
          />
        </div> :

        <div className='popup medium-body bg-light-blue blue'>
          <img
            src={checkedIcon}
            alt="Icone de checado"
          />
          {popupMessage}
          <img
            src={closeIcon}
            alt="Icone de fechar"
            style={{
              cursor: 'pointer'
            }}
            onClick={() => setIsPopup(false)}
          />
        </div>}
    </>
  )
}