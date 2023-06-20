import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleBackdrop from '../../General/BackdropLoading';
import useMain from '../../../hooks/useMain';
import api from '../../../services/api';
import { setItem } from '../../../utils/storage';
import objects from './objects';
import IconEyeClose from "./assets/eye-close.svg";
import IconEyeOpen from "./assets/eye-open.svg";
import './style.css';

function Login() {
  const [imgEyePassword, setImgEyePassword] = useState(IconEyeClose);
  const [typeOfPassword, setTypeOfPassword] = useState("password");

  const { login, setLogin, handleReset, defaultEmailErrorMessage } = useMain();
  const [form, setForm] = useState(objects.form);
  const [errorMessages, setErrorMessages] = useState(objects.form);
  const [errorMessageServer, setErrorMessageServer] = useState('');

  const [showPassword, setShowPassword] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleShowHidePassword = (e) => {
    setShowPassword(!showPassword)
  }

  const empty = "";
  const space = " ";

  const handleChangePasswordVisibility = () => {
    if (typeOfPassword === "password") {
      setImgEyePassword(IconEyeOpen);
      setTypeOfPassword("text");

    } else {
      setImgEyePassword(IconEyeClose);
      setTypeOfPassword("password");
    }
  }

  const navigate = useNavigate();

  const handleSignUp = () => {
    handleReset();
    setLogin(!login);
  }

  function handleForm(event) {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  }

  const validateFieldsFormLogin = () => {
    if (form.email === empty) {
      setErrorMessages({
        ...errorMessages, email: "Campo e-mail deve ser preenchido"
      });
      return true;
    }

    if (form.email.includes(space)) {
      setErrorMessages({
        ...errorMessages, email: defaultEmailErrorMessage
      });
      return true;
    }

    const positionAt = form.email.indexOf('@');

    if (positionAt === -1) {
      setErrorMessages({
        ...errorMessages, email: defaultEmailErrorMessage
      });
      return true;
    }

    const positionDot = form.email.indexOf('.', positionAt);
    const pointNotFound = positionDot === -1;

    if (pointNotFound) {
      setErrorMessages({
        ...errorMessages, email: defaultEmailErrorMessage
      });
      return true;
    }

    const emailEndsAtDot = form.email.length === positionDot + 1;

    if (emailEndsAtDot) {
      setErrorMessages({
        ...errorMessages, email: defaultEmailErrorMessage
      });
      return true;
    }

    if (form.password === empty) {
      setErrorMessages({
        ...errorMessages, password: "Campo senha deve ser preenchido"
      });
      return true;
    }

    if (form.password.length + 1 < 9) {
      setErrorMessages({
        ...errorMessages, password: "A senha deve ter no mínimo 8 caracteres!"
      });
      return true;
    }

    if (form.password.includes(space)) {
      setErrorMessages({
        ...errorMessages, password: "A senha não deve conter espaços"
      });
      return true;
    }

    return false;
  }

  const clearErrorMessages = () => setErrorMessages(objects.form);

  const clearErrorOneMessage = (nameProperty) => {
    if (!nameProperty) return;

    const propertys = Object.keys(errorMessages);

    if (propertys.includes(nameProperty)) {

      propertys.forEach(property => {
        const InputSelectedEqualsErrorType = errorMessages.property !== empty && property === nameProperty;

        if (InputSelectedEqualsErrorType) {
          setErrorMessages({ ...errorMessages, [nameProperty]: empty });
        }

      });
    }
  }

  const clearAllErrors = () => {
    clearErrorMessages();

    if (errorMessageServer !== empty) setErrorMessageServer(empty);
  }

  const showErrorsServer = (error) => {
    const { data: mensagem } = error.response;

    setErrorMessageServer(mensagem);
  }

  async function Login(event) {
    event.preventDefault();
    event.stopPropagation();

    clearAllErrors();

    const thereWasAnError = validateFieldsFormLogin(form);

    if (thereWasAnError) return;
    setOpenBackdrop(true)
    try {
      const { status, data } = await api.post('/login', form);
      if (status == 200) {
        setItem('token', data.token);
        setItem('userId', data.user.id);
        navigate('/home')
      }
    } catch (error) {
      setOpenBackdrop(false)
      showErrorsServer(error);
    }
  }

  return (
    <div className="step-one flex-row align-center margin-t-235">
      <form className="flex-column step-one">
        <span className="title2 gray1 center">Faça seu login!</span>
        <label className="medium-body gray3 margin-t-32" htmlFor='email'>E-mail</label>
        <input className='input margin-t-6'
          placeholder="Digite seu e-mail"
          type='email'
          name='email'
          value={form.email}
          autoComplete="on"
          onChange={(event) => handleForm(event)}
          onFocus={() => clearErrorOneMessage('email')}
        />
        <span className='red-error margin-t-6'>{errorMessages.email}</span>
        <div className='flex-row justify-between margin-t-20'>
          <label className="medium-body gray3" htmlFor='password'>Senha</label>
          <a className='link pink' href="#">Esqueceu a senha?</a>
        </div>
        <div>
          <input
            className='input margin-t-6'
            type={typeOfPassword}
            placeholder="Digite sua senha"
            name='password'
            value={form.password}
            autoComplete="on"
            onChange={(event) => handleForm(event)}
            onFocus={() => clearErrorOneMessage("password")}
          />
          <img
            className="img-eye"
            src={imgEyePassword}
            alt="eye"
            onClick={handleChangePasswordVisibility}
          />
        </div>
        <span className='red-error margin-t-6'>{errorMessages.password}</span>
        <span className='align-self-center margin-t-6 red-error'>{errorMessageServer}</span>
        <button
          className="bg-pink btn center margin-t-46"
          onClick={(event) => Login(event)}
          type='button'>
          Entrar
        </button>

        <SimpleBackdrop
          openBackdrop={openBackdrop}
          setOpenBackdrop={setOpenBackdrop}
        />

        <span className="gray2 margin-t-15 center subtitle-login"
        >Ainda não possui uma conta?
          <a className='link pink' onClick={handleSignUp}> Cadastre-se</a>
        </span>
      </form>
    </div >
  )
}

export default Login;
