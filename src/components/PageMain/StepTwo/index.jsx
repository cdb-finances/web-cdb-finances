import { useEffect, useState } from 'react';
import IconEyeClose from "./assets/eye-close.svg";
import IconEyeOpen from "./assets/eye-open.svg";
import useMain from '../../../hooks/useMain';
import './style.css';
import SeePassword from '../../../assets/see-password.svg';

function StepTwo() {
  const [imgEyePassword, setImgEyePassword] = useState(IconEyeClose);
  const [imgEyeConfirmPassword, setImgEyeConfirmPassword] = useState(IconEyeClose);
  const [typeOfPassword, setTypeOfPassword] = useState("password");
  const [typeOfConfirmPassword, setTypeOfConfirmPassword] = useState("password");
  const {
    activeStep, login, setLogin, handleNext, formSignUp, handleForm, handleRegisterUser,
    errorMessagesSignUp, errorMessageServerSignUp, clearAllErrorsSignUp, clearErrorOneMessageSignUp,
    handleClearForm,
  } = useMain();

  useEffect(() => { }, [login, activeStep]);

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

  const handleLinkRedrectSignIn = () => {
    clearAllErrorsSignUp();
    handleClearForm();
    setLogin(!login);
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleShowHidePassword = (e) => {
    setShowPassword(!showPassword)
  }

  const handleShowHideConfirmPassword = (e) => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleNext();
  }

  return (
    <div className="step-two flex-row align-center margin-t-208">
      <form className="flex-column step-one" onSubmit={handleSubmit}>
        <span className="title2 gray1 center">Escolha uma senha</span>
        <label className="medium-body gray3 margin-t-32">Senha*</label>
        <div>
          <input className='input margin-t-6'
            type={typeOfPassword}
            placeholder="Digite sua senha"
            name='password'
            value={formSignUp?.password}
            onChange={handleForm}
            onFocus={() => clearErrorOneMessageSignUp('password')}
          />  
          <img
            className="img-eye"
            src={imgEyePassword}
            alt="eye"
            onClick={handleChangePasswordVisibility}
          />
        </div>
        <span className='red-error margin-t-6 medium-body'>{errorMessagesSignUp.password}</span>

        <label className="medium-body gray3 margin-t-20">Repita a senha*</label>
        <div>
          <input className='input margin-t-6'
            type={typeOfConfirmPassword}
            placeholder="Confirme sua senha"
            name='confirmPassword'
            value={formSignUp?.confirmPassword}
            onChange={handleForm}
            onFocus={() => clearErrorOneMessageSignUp('confirmPassword')}
          />
          <img
            className="img-eye"
            src={imgEyeConfirmPassword}
            alt="eye"
            onClick={handleChangeConfirmPasswordVisibility}
          />
        </div>
        <span className='red-error margin-t-6 medium-body'>{errorMessagesSignUp.confirmPassword}</span>
        <button className="medium-body bg-pink btn center margin-t-46" onClick={handleRegisterUser}>
          Entrar
        </button>
        <span className='align-self-center margin-t-6 red-error medium-body'>{errorMessageServerSignUp}</span>
        <span className="gray2 margin-t-15 center subtitle-login">
          Já possui uma conta? Faça seu
          <a className='link pink'
            onClick={handleLinkRedrectSignIn}
          > Login</a>
        </span>
      </form>
    </div>
  );
}

export default StepTwo;
