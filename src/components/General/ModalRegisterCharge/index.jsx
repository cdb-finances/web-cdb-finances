import useHome from '../../../hooks/useHome';
import './style.css';
import closeIcon from './assets/close-modal.svg';
import fileIcon from './assets/file-icon.svg';
import checkIcon from './assets/check-icon.svg'
import { useEffect, useState } from 'react';
import api from '../../../services/api';
import formatCentsIntoReais from "../../../utils/formatCentsIntoReais";
import { getItem } from '../../../utils/storage';

export default function ModalRegisterCharge() {
  const {
    setIsModalRegisterCharge, currentClient,
    setIsPopup, setPopupMessage, setUpdateRender, updateRender
  } = useHome();
  const [checked, setChecked] = useState(true);
  const [chargeError, setChargeError] = useState('');
  const id = currentClient.id
  const [formCharge, setFormCharge] = useState({
    description: "",
    status: Boolean,
    value: "",
    due_date: "",
  });

  const handleFormCharge = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'due_date') {
      const [day, month] = value.split('/')
      if (Number(day > 31)) {
        setFormCharge({ ...formCharge, ['due_date']: "" })
        return setChargeError('Data inválida')
      }
      if (Number(month > 12)) {
        setFormCharge({ ...formCharge, ['due_date']: "" })
        return setChargeError('Data inválida')
      }
    }

    if (name === 'due_date' && value.length === 2) {
      setFormCharge({ ...formCharge, [name]: value.concat('/') })
      return
    }

    if (name === 'due_date' && value.length === 5) {
      setFormCharge({ ...formCharge, [name]: value.concat('/') })
      return
    }

    if (name === "value") {
      setFormCharge({ ...formCharge, [name]: `R$ ${formatCentsIntoReais(value.replace(/[^0-9]/g, ''))}` })
      return;
    }

    setFormCharge({ ...formCharge, [name]: value })
  }

  const createCharge = async () => {
    formCharge.status = checked

    if (!formCharge.description) {
      return setChargeError('Este campo deve ser preenchido.')
    }
    if (!formCharge.due_date) {
      return setChargeError('Este campo deve ser preenchido.')
    }
    if (!formCharge.value) {
      return setChargeError('Este campo deve ser preenchido.')
    }

    const valueFormated = formCharge.value.replace(/[^0-9]/g, '').trim();

    const newCharge = {
      ...formCharge,
      value: valueFormated,
    }

    try {
      await api.post(`/charge/${id}`, newCharge, { headers: { Authorization: `Bearer ${getItem("token")}`, } })
      setPopupMessage('Cobrança cadastrada com sucesso')
      setIsPopup(true)
      setIsModalRegisterCharge(false)
      setUpdateRender(!updateRender)

    } catch (error) {
      return console.log(error);
    }
  }

  return (
    <div className="modal">
      <div className="modal_card">

        <form className='form-register-charge' onSubmit={(e) => preventDefault(e)}>
          <div className="header-form">
            <div style={{ display: 'flex', gap: '16px' }}>
              <img src={fileIcon} alt="clients icon"></img>
              <span className="gray1 title1">Cadastro do Cobrança</span>
            </div>

            <img
              src={closeIcon}
              alt="close icon"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsModalRegisterCharge(false)}
            />
          </div>

          <div className="container-input">
            <label className="gray2 input-label">Nome*</label>
            <input className="input-register-charge input"
              placeholder="Digite o nome"
              type='text'
              name='name'
              value={currentClient.name}
              readOnly
            />
          </div>

          <div className="container-input ">
            <label className="gray2 input-label">Descrição*</label>
            <input
              className={
                !formCharge.description && chargeError ?
                  "input-description border-error body" : "input-description body"
              }
              placeholder="Digite a descrição"
              type='text'
              name='description'
              value={formCharge.description}
              onChange={handleFormCharge}
            />
            {!formCharge.description && <span className="red-error small-body">{chargeError}</span>}
          </div>

          <div className='container-input-row'>
            <div className='container-input'>
              <label className='input-label gray2'>Vencimento*</label>
              <input
                type="text"
                maxLength={10}
                className={
                  !formCharge.due_date && chargeError ?
                    "input-register-charge border-error input" : "input-register-charge input"
                }
                placeholder='Data de vencimento'
                name='due_date'
                value={formCharge.due_date}
                onChange={handleFormCharge}
              />
              {!formCharge.due_date && <span className="red-error small-body">{chargeError}</span>}
            </div>

            <div className='container-input'>
              <label className='input-label gray2'>Valor*</label>
              <input
                type="text"
                className={
                  !formCharge.value && chargeError ?
                    "input-register-charge border-error input" : "input-register-charge input"
                }
                placeholder='Digite o valor'
                name='value'
                value={`${formCharge.value}`}
                onChange={handleFormCharge}
              />
              {!formCharge.value && <span className="red-error small-body">{chargeError}</span>}
            </div>
          </div>

          <div className='container-input'>
            <label className='input-label'>Status*</label>
            <div className='container-btns-check' onClick={() => setChecked(!checked)} >
              {
                checked === false ?
                  <button type='button' className='btn-check' /> :
                  <button type='button'
                    className='btn-checked'
                    style={{
                      backgroundImage: `url(${checkIcon})`,
                    }}
                  />
              }
              <label className='body'>Cobrança Paga</label>
            </div>

            <div className='container-btns-check' onClick={() => setChecked(!checked)} >
              {
                checked === true ?
                  <button type='button' className='btn-check' /> :
                  <button
                    type='button'
                    className='btn-checked'
                    style={{
                      backgroundImage: `url(${checkIcon})`,
                    }}
                  />
              }
              <label className='body'>Cobrança pendente</label>
            </div>
          </div>

          <div className="container-btns-register-charge">
            <button
              className="bg-gray8 btn-cancel green width100 "
              type="button"
              style={{
                width: '100%',
                height: '33px',
                borderRadius: '10px'
              }}
              onClick={() => setIsModalRegisterCharge(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-pink gray8"
              type="button"
              style={{
                width: '100%',
                height: '33px',
                border: 'none',
                borderRadius: '10px'
              }}
              onClick={(e) => createCharge(e)}
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
