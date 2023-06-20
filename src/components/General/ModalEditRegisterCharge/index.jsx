import { useEffect, useState } from "react";
import useHome from "../../../hooks/useHome";
import api from '../../../services/api';
import { getItem } from '../../../utils/storage'
import fileIcon from './assets/file-icon.svg';
import closeIcon from './assets/close-icon.svg';
import checkIcon from './assets/check-icon.svg';
import formatCentsIntoReais from "../../../utils/formatCentsIntoReais";
import './style.css';

export default function ModalEditRegisterCharge() {

    const { setIsModalEditRegisterCharge,
        currentClient, setPopupMessage, setIsPopup,
        setUpdateRender, updateRender, currentCharge } = useHome();

    const [checked, setChecked] = useState(true);
    const [formCharge, setFormCharge] = useState({
        description: currentCharge.description,
        value: formatCentsIntoReais(currentCharge.value.replace(/[^0-9]/g, '')),
        status: Boolean,
        due_date: currentCharge.due_date
    });

    const [chargeErrors, setChargeErrors] = useState({
        description: "",
        value: "",
        due_date: ""
    });

    useEffect(() => {
        setChargeErrors({
            description: "",
            value: "",
            due_date: ""
        })
    }, [formCharge])


    const handleFormCharge = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        if (name === 'due_date') {
            const [day, month] = value.split('/')
            if (Number(day > 31)) {
                setFormCharge({ ...formCharge, ['due_date']: "" })
                return setChargeErrors({ ...chargeErrors, due_date: "Data inválida" })
            }
            if (Number(month > 12)) {
                setFormCharge({ ...formCharge, ['due_date']: "" })
                return setChargeErrors({ ...chargeErrors, due_date: "Data inválida" })
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

        if ("value" === name) {
            setFormCharge({ ...formCharge, [name]: `${formatCentsIntoReais(value.replace(/[^0-9]/g, ''))}` })
            return;
        }

        setFormCharge({ ...formCharge, [name]: value })
    };

    async function updateCharge() {
        formCharge.status = checked
        const valueFormated = formCharge.value.replace(/[^0-9]/g, '').trim();

        if (!formCharge.description) {
            return setChargeErrors({ ...chargeErrors, description: "Este campo deve ser preenchido" })
        };

        if (!valueFormated) {
            return setChargeErrors({ ...chargeErrors, value: "Este campo deve ser preenchido" })
        };

        if (!formCharge.due_date) {
            return setChargeErrors({ ...chargeErrors, due_date: "Este campo deve ser preenchido" })
        };

        const newUpdateCharge = {
            ...formCharge,
            value: valueFormated,
        }

        try {
            await api.put(`/charge/${currentCharge.id}`, newUpdateCharge,
                { headers: { Authorization: `Bearer ${getItem("token")}`, } })
            setPopupMessage('Cobrança editada com sucesso!')
            setIsPopup(true)
            setIsModalEditRegisterCharge(false)
            setUpdateRender(!updateRender)

        } catch (error) {
            return console.log(error);
        }
    };

    return (
        <div className="modal">
            <div className="modal_card">
                <form className='form-register-charge' onSubmit={(e) => preventDefault(e)}>
                    <div className="header-form">
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <img src={fileIcon} alt="clients icon"></img>
                            <span className="gray1 title1">Edição de Cobrança</span>
                        </div>
                        <img
                            src={closeIcon}
                            alt="close icon"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsModalEditRegisterCharge(false)}
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
                                !formCharge.description && chargeErrors ?
                                    "input-description border-error body" : "input-description body"
                            }
                            placeholder="Digite a descrição"
                            type='text'
                            name='description'
                            value={formCharge.description}
                            onChange={handleFormCharge}
                        />
                        {chargeErrors.description && <span className="red-error small-body">{chargeErrors.description}</span>}
                    </div>

                    <div className='container-input-row'>
                        <div className='container-input'>
                            <label className='input-label gray2'>Vencimento*</label>
                            <input
                                type="text"
                                maxLength={10}
                                className={
                                    !formCharge.due_date && chargeErrors ?
                                        "input-register-charge border-error input" : "input-register-charge input"
                                }
                                placeholder='Data de vencimento'
                                name='due_date'
                                value={formCharge.due_date}
                                onChange={handleFormCharge}
                            />
                            {chargeErrors.due_date && <span className="red-error small-body">{chargeErrors.due_date}</span>}
                        </div>

                        <div className='container-input'>
                            <label className='input-label gray2'>Valor*</label>
                            <input
                                type="text"
                                className={
                                    chargeErrors.value ?
                                        "input-register-charge border-error input" : "input-register-charge input"
                                }
                                placeholder='Digite o valor'
                                name='value'
                                value={`R$ ${formCharge.value}`}
                                onChange={handleFormCharge}
                            />
                            {chargeErrors.value && <span className="red-error small-body">{chargeErrors.value}</span>}
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
                            onClick={() => setIsModalEditRegisterCharge(false)}
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
                            onClick={updateCharge}
                        >
                            Aplicar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};
