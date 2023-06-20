import { useState } from "react";
import useHome from "../../../hooks/useHome";
import api from '../../../services/api';
import performZipCodeQuery from "../../../services/performZipCodeQuery";
import clientsIcon from "./assets/clients-modal.svg";
import closeIcon from "./assets/close-modal.svg";
import { getItem } from '../../../utils/storage'
import "./style.css";

function ModalRegisterClient() {
  const { setIsModalRegisterClient, setPopupMessage, setIsPopup, setUpdateRender, updateRender } = useHome();

  const [formClient, setFormClient] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    address: "",
    complement: "",
    zip_code: "",
    neighborhood: "",
    city: "",
    state: ""
  })

  const [clientErrors, setClientErrors] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    zip_code: "",
  })

  const showClientErrors = (error) => {
    const { mensagem } = error.response.data;
    if (mensagem.includes('e-mail')) {
      setClientErrors({ ...clientErrors, email: mensagem, phone: "" });
      return;
    }

    if (mensagem.includes('cpf')) {
      setClientErrors({ ...clientErrors, cpf: mensagem });
      return;
    }
  }

  function handleFormCharge(event) {
    const value = event.target.value;
    const name = event.target.name;

    setFormClient({ ...formClient, [name]: value })
  }

  const validateIfCharacterIsNumber = (character) => {
    return parseInt(character, 10) || character === "0" || character === 0;
  }

  const removeNonNumberCharacter = (value) => {
    const empty = "";

    const convertedToArray = value.split(empty);

    const numbers = (convertedToArray.filter(character =>
      validateIfCharacterIsNumber(character)
    )).join(empty);

    return numbers;
  }

  const clearAClientError = (property, message) => {
    setClientErrors(prevState => ({ ...prevState, [property]: message }));
  }

  const handleZipCodeProvided = async ({ target: zipCode }) => {
    const empty = "";
    const sizeForErrorMessage = "Quantidade de números inválido";

    const zipCodeFormatted = removeNonNumberCharacter(zipCode.value)

    const sizeZipCode = zipCodeFormatted.length;

    if (sizeZipCode < 8 || sizeZipCode > 8) {
      clearAClientError("zip_code", sizeForErrorMessage);
      return;
    }

    const { zipdCodeData, error } = await performZipCodeQuery(zipCodeFormatted);

    if (error) {
      clearAClientError("zip_code", error);
      return;
    }

    if (clientErrors.zip_code) {
      clearAClientError("zip_code", empty);
    }

    const { localidade: city, uf: state } = zipdCodeData;

    setFormClient(prevState => ({ ...prevState, city: city || empty, state: state || empty }));
  }

  async function createClient() {

    if (!formClient.name) {
      setClientErrors({ name: "Este campo deve ser preenchido" });
      return
    }

    if (!formClient.email) {
      setClientErrors({ email: "Este campo deve ser preenchido" });
      return
    }

    if (!formClient.cpf) {
      setClientErrors({ cpf: "Este campo deve ser preenchido" });
      return
    }

    if (!formClient.phone) {
      setClientErrors({ phone: "Este campo deve ser preenchido" });
      return
    }
    const cpfFOrmated = formClient.cpf.match(/\d+/g).join("");
    const phoneFormated = formClient.phone.match(/\d+/g).join("");

    if (phoneFormated.length < 10) {
      return setClientErrors({ phone: "Telefone inválido!" })
    }

    try {
      const client = {
        ...formClient,
        cpf: cpfFOrmated,
        phone: phoneFormated
      };

      await api.post('/client', client, { headers: { Authorization: `Bearer ${getItem("token")}`, } }
      );

      setIsPopup(true)
      setPopupMessage('Cadastro concluído com sucesso')
      setIsModalRegisterClient(false)
      setUpdateRender(!updateRender)
      return

    } catch (error) {
      console.log(error);
      showClientErrors(error)
      return
    }
  }

  return (
    <div className="modal">
      <div className="modal_card">
        <form onSubmit={(event) => preventDefault(event)}>
          <div className="flex-row justify-between">
            <div className="flex-row modal-title">
              <img src={clientsIcon} alt="clients icon"></img>
              <span className="width100 gray1 title1">Cadastro do Cliente</span>
            </div>
            <img
              style={{ cursor: 'pointer' }}
              src={closeIcon}
              alt="close icon"
              onClick={() => setIsModalRegisterClient(false)}
            />
          </div>

          <div className="flex-column margin-t-16">
            <label className="gray2">Nome*</label>
            <input className={
              clientErrors.name ? "input margin-t-6 border-error" : "input margin-t-6"
            }
              placeholder="Digite o nome"
              type='text'
              name='name'
              value={formClient.name}
              onChange={(e) => handleFormCharge(e)}></input>
            {clientErrors.name &&
              <span className="red small-body">{clientErrors.name}</span>}
          </div>

          <div className="flex-column margin-t-8">
            <label className="gray2">E-mail*</label>
            <input className={
              clientErrors.email ? "input margin-t-6 border-error" : "input margin-t-6"
            }
              placeholder="Digite o e-mail"
              type='email'
              name='email'
              value={formClient.email}
              onChange={(e) => handleFormCharge(e)}></input>
            {clientErrors.email &&
              <span className="red small-body">{clientErrors.email}</span>}
          </div>

          <div className="flex-row margin-t-8 justify-between gap">
            <div className="flex-column width100">
              <label className="gray2">CPF*</label>
              <input className={
                clientErrors.cpf ? "input margin-t-6 border-error" : "input margin-t-6"
              }
                placeholder="Digite o CPF"
                type='text'
                name='cpf'
                maxLength={11}
                value={formClient.cpf}
                onChange={(e) => handleFormCharge(e)}></input>
              {clientErrors.cpf &&
                <span className="red small-body">{clientErrors.cpf}</span>}
            </div>
            <div className="flex-column width100">
              <label className="gray2">Telefone*</label>
              <input className={
                clientErrors.phone ? "input margin-t-6 border-error" : "input margin-t-6"
              }
                placeholder="Digite o telefone"
                type='text'
                name='phone'
                value={formClient.phone}
                onChange={(e) => handleFormCharge(e)}></input>
              {clientErrors.phone &&
                <span className="red small-body">{clientErrors.phone}</span>}
            </div>
          </div>

          <div className="flex-column margin-t-8">
            <label className="gray2">Endereço</label>
            <input className="input margin-t-6"
              placeholder="Digite o endereço"
              type='text'
              name='address'
              onChange={(e) => handleFormCharge(e)}></input>
          </div>

          <div className="flex-column margin-t-8">
            <label className="gray2">Complemento</label>
            <input className="input margin-t-6"
              placeholder="Digite o complemento"
              type='text'
              name='complement'
              value={formClient.complement}
              onChange={(e) => handleFormCharge(e)}></input>
          </div>

          <div className="flex-row margin-t-8 justify-between gap">
            <div className="flex-column width100">
              <label className="gray2">CEP</label>
              <input className={
                clientErrors.zip_code ? "input margin-t-6 border-error" : "input margin-t-6"
              }
                placeholder="Digite o CEP"
                type='text'
                name='zip_code'
                value={formClient.zip_code}
                onBlur={handleZipCodeProvided}
                onChange={(e) => handleFormCharge(e)}></input>
              <span className="red small-body">{clientErrors.zip_code}</span>
            </div>
            <div className="flex-column width100">
              <label className="gray2">Bairro</label>
              <input className="input margin-t-6"
                placeholder="Digite o bairro"
                type='text'
                name='neighborhood'
                value={formClient.neighborhood}
                onChange={(e) => handleFormCharge(e)}></input>
            </div>
          </div>

          <div className="flex-row margin-t-8 justify-between gap  width100">
            <div className="flex-column width70">
              <label className="gray2">Cidade</label>
              <input className="input margin-t-6"
                placeholder="Digite a cidade"
                type='text'
                name='city'
                value={formClient.city}
                onChange={(e) => handleFormCharge(e)}></input>
            </div>
            <div className="flex-column width30">
              <label className="gray2">UF</label>
              <input className="input margin-t-6"
                placeholder="Digite a UF"
                type='text'
                name='state'
                value={formClient.state}
                onChange={(e) => handleFormCharge(e)}></input>
            </div>
          </div>
          <div className="flex-row margin-t-57 gap">
            <button
              className="bg-gray8 btn-cancel green width100 "
              type="button"
              onClick={() => setIsModalRegisterClient(false)}
              style={{
                width: '100%',
                height: '33px',
                borderRadius: '10px'
              }}
            >
              Cancelar
            </button>
            <button
              className="bg-pink gray8"
              type="button"
              onClick={createClient}
              style={{
                width: '100%',
                height: '33px',
                border: 'none',
                borderRadius: '10px'
              }}
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default ModalRegisterClient;
