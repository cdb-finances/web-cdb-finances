import "./style.css";
import closeIcon from './assets/close-modal.svg';
import fileIcon from './assets/file-icon.svg';
import useHome from "../../../hooks/useHome";
import formatCentsIntoReais from "../../../utils/formatCentsIntoReais";

function ModalChargeDetail() {
  const { setIsModalChargeDetail, currentCharge } = useHome();

  function isDateAfterToday(due_date) {

    const today = new Date();
    const [day, month, year] = due_date.split('/');
    const inputDate = new Date(`${year}-${month}-${day}`);
    return +inputDate > +today;
  };

  return (
    <div className="modal">
      <div className="modal_card flex-column">
        <div className="content">
          <div className="header-modal">
            <div style={{ display: 'flex', gap: '16px' }}>
              <img src={fileIcon} alt="clients icon"></img>
              <span className="gray1 title1">Detalhe da Cobrança</span>
            </div>
            <img
              src={closeIcon}
              alt="close icon"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsModalChargeDetail(false)}
            />
          </div>

          <div className="flex-column margin-t-16">
            <span className="subtitle">Nome</span>
            <span className="body margin-t-8">{currentCharge.name}</span>
          </div>
          <div className="flex-column margin-t-24">
            <span className="subtitle">Descrição</span>
            <span className="body margin-t-4">{currentCharge.description}</span>
          </div>
          <div className="flex margin-t-24">
            <div className="flex-column width-50-percent">
              <span className="subtitle">Vencimento</span>
              <span className="body margin-t-8">{currentCharge.due_date}</span>
            </div>
            <div className="flex-column width-50-percent">
              <span className="subtitle">Valor</span>
              <span className="body margin-t-8">R$ {formatCentsIntoReais(currentCharge.value)}</span>
            </div>
          </div>
          <div className="flex margin-t-24">
            <div className="flex-column width-50-percent">
              <span className="subtitle">ID cobranças</span>
              <span className="body margin-t-8">{currentCharge.id}</span>
            </div>
            <div className="flex-column width-50-percent">
              <span className="subtitle">Status</span>
              <span className="body margin-t-8">{
                currentCharge.paid_out === true ?
                  <span className='client-status pd-26 cyan bg-cyan'>Paga</span>
                  : isDateAfterToday(currentCharge.due_date) ? <span className='client-status pd-8 yellow bg-light-red'>Pendentes</span> :
                    <span className='client-status pd-17 red bg-light-red'>Vencida</span>
              }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalChargeDetail;
