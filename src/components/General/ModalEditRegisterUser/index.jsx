import "./style.css";
import { useState } from "react";
import IconSuccess from "./assets/icon-success.svg";
import IconClose from "./assets/icon-close.svg";
import IconEyeClose from "./assets/eye-close.svg";
import IconEyeOpen from "./assets/eye-open.svg";
import api from "../../../services/api";
import useHome from "../../../hooks/useHome";
import { getItem } from "../../../utils/storage";

function ModalEditRegisterUser() {
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const titleModalSuccess = "Cadastro Alterado com sucesso!";
  const [typeOfPassword, setTypeOfPassword] = useState("password");
  const [typeOfConfirmPassword, setTypeOfConfirmPassword] = useState("password");
  const [imgEyePassword, setImgEyePassword] = useState(IconEyeClose);
  const [imgEyeConfirmPassword, setImgEyeConfirmPassword] = useState(IconEyeClose);
  const form = {
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }
  const [messageErros, setMessageErros] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setIsModalEditUser, formProfile, updatedUser, setUpdatedUser } = useHome();
  const [formEditUser, setFormEditUser] = useState({
    ...formProfile,
    password: "",
    confirmPassword: ""
  });

  const closeModalEditUser = () => {
    setIsModalEditUser(false)
  }

  const clearErrosForm = () => {
    setMessageErros(form);
  }

  const showErrosForm = () => {
    if (formEditUser.name === "") {
      setMessageErros({ ...messageErros, name: "O campo nome é obrigatório." });
      return true;
    }

    if (formEditUser.email === "") {
      setMessageErros({ ...messageErros, email: "O campo e-mail é obrigatório." });
      return true;
    }

    const index = formEditUser.email.indexOf('@');

    if (index === -1) {
      setMessageErros({ ...messageErros, email: "Insira um '@' para um e-mail válido" });
      return true;
    }

    const pointNotFound = formEditUser.email.indexOf('.', index) === -1;

    if (pointNotFound) {
      setMessageErros({ ...messageErros, email: "Insira um '.' depois de '@' para um e-mail válido" });
      return true;
    }

    if (formEditUser.email.includes(" ")) {
      setMessageErros({ ...messageErros, email: "Não é permitido espaços no endereço de e-mail" });
      return true;
    }

    if (formEditUser.password !== "") {
      if (formEditUser.password !== formEditUser.confirmPassword) {
        setMessageErros({ ...messageErros, confirmPassword: "As senhas não conferem." });
        return true;
      }

      if (formEditUser.password.length < 8) {
        setMessageErros({ ...messageErros, confirmPassword: "A semha precisa conter no mínimo 8 caracteres." });
        return true;
      }

      if (formEditUser.confirmPassword === "") {
        setMessageErros({ ...messageErros, confirmPassword: "O campo confirmar senha é obrigatório." });
        return true;
      }


      for (const caractere in formEditUser.password) {
        if (caractere === " ") {
          setMessageErros({ ...messageErros, password: "Não é permitido espaços em senhas" });
          return true;
        }
      }
      return false;
    }
  }

  const showErrosServer = (error) => {


    const { mensagem } = error.response.data;

    if (mensagem.includes("nome")) {
      setMessageErros({ ...messageErros, name: mensagem });
    }

    if (mensagem.includes("e-mail")) {
      setMessageErros({ ...messageErros, email: mensagem });
    }

    if (mensagem.includes("senha")) {
      setMessageErros({ ...messageErros, password: mensagem });
    }
  }

  const editUserRegistry = async (e) => {
    e.preventDefault();

    clearErrosForm();

    if (showErrosForm()) {
      return;
    }

    try {
      if (formEditUser.password !== "") {
        const { confirmPassword, id, ...editedUser } = formEditUser;
        await api.put('/user', editedUser, { headers: { Authorization: `Bearer ${getItem("token")}`, } });
        setUpdatedUser(!updatedUser);
        return openSuccessModal();
      }

      const { confirmPassword, password, id, ...editedUser } = formEditUser;
      await api.put('/user', editedUser, { headers: { Authorization: `Bearer ${getItem("token")}`, } });
      setUpdatedUser(!updatedUser);
      return openSuccessModal();

    } catch (error) {
      showErrosServer(error);
      return true;
    }
  }

  const openSuccessModal = () => {
    setOpenModalSuccess(true);

    setTimeout(() => {
      closeModalEditUser();
      setOpenModalSuccess(false);
    }, 2000);
  };

  const handleStorageValueInput = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setFormEditUser({ ...formEditUser, [property]: value });
  }

  const handleChangePasswordVisibility = () => {
    if (typeOfPassword === "password") {
      setImgEyePassword(IconEyeOpen);
      setTypeOfPassword("text");

    } else {
      setImgEyePassword(IconEyeClose);
      setTypeOfPassword("password");
    }
  }

  const handleChangeConfirmPasswordVisibility = () => {
    if (typeOfConfirmPassword === "password") {
      setImgEyeConfirmPassword(IconEyeOpen);
      setTypeOfConfirmPassword("text");

    } else {
      setImgEyeConfirmPassword(IconEyeClose);
      setTypeOfConfirmPassword("password");
    }
  }

  return (
    <div className="modal">
      {
        openModalSuccess ?
          <div className="modal-success flex-center-column gap-24 white1" onClick={closeModalEditUser}>
            <img src={IconSuccess} alt="success" />
            <h1 className="title2 gray1">{titleModalSuccess}</h1>
          </div>
          :
          <div className="modal-edit-register-user flex-center-column white1 border-radius-30">
            <h1 className="flex align-self-center title2 gray1">
              Edite seu cadastro
            </h1>
            <img src={IconClose} alt="close" onClick={closeModalEditUser} style={{ cursor: 'pointer' }} />
            <form className="flex-column margin-t-32" onSubmit={editUserRegistry}>
              <label>Nome*</label>
              <input className={messageErros.name ? "margin-t-6 input white1 border-error" : "margin-t-6 input white1 border-input"}
                type="text"
                name="name"
                value={formEditUser.name}
                onChange={handleStorageValueInput}
              />
              <span className="red-error medium-body">{messageErros.name}</span>
              <label className="margin-t-20">E-mail*</label>
              <input className={messageErros.email ? "margin-t-6 input white1 border-error" : "margin-t-6 input white1 border-input"}
                type="text"
                name="email"
                value={formEditUser.email}
                onChange={handleStorageValueInput}
              />
              <span className="red-error medium-body">{messageErros.email}</span>
              <div className="flex-row justify-between margin-t-20 gap-24">
                <div className="flex-column">
                  <label>CPF</label>
                  <input className="margin-t-6 input white1"
                    type="text"
                    name="cpf"
                    value={formEditUser.cpf}
                    onChange={handleStorageValueInput}
                  />
                </div>
                <div className="flex-column">
                  <label>Telefone</label>
                  <input className="margin-t-6 input white1"
                    type="text"
                    name="phone"
                    value={formEditUser.phone}
                    onChange={handleStorageValueInput}
                  />
                </div>
              </div>
              <label className="margin-t-20">Nova Senha*</label>
              <div className="display-row align-center margin-t-6">
                <input className={messageErros.password ? "margin-t-6 input white1 border-error" : "margin-t-6 input white1 border-input"}
                  type={typeOfPassword}
                  name="password"
                  value={formEditUser.password}
                  onChange={handleStorageValueInput}
                />
                <img
                  className="img-eye"
                  src={imgEyePassword}
                  alt="eye"
                  onClick={handleChangePasswordVisibility}
                />
              </div>
              <span className="red-error medium-body">{messageErros.password}</span>
              <label className="margin-t-20">Confirmar Senha*</label>
              <div className="margin-t-6">
                <input className={messageErros.confirmPassword ? "margin-t-6 input white1 border-error" : "margin-t-6 input white1 border-input"}
                  type={typeOfConfirmPassword}
                  name="confirmPassword"
                  value={formEditUser.confirmPassword}
                  onChange={handleStorageValueInput}
                />
                <img
                  className="img-eye"
                  src={imgEyeConfirmPassword}
                  alt="eye"
                  onClick={handleChangeConfirmPasswordVisibility}
                />
              </div>
              <span className="red-error medium-body">{messageErros.confirmPassword}</span>
              <button className="border-radius-10 bg-pink align-self-center margin-t-16 btn-text gray8">
                Aplicar
              </button>
            </form>
          </div>
      }
    </div>
  )
}

export default ModalEditRegisterUser;