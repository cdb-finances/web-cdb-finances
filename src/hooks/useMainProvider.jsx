import { useEffect, useState } from 'react';
import objectsStepOne from '../components/PageMain/StepOne/objects';
import objectsChargeStates from "../components/PageHome/TableChargeStates/objects";
import api from '../services/api';

function useMainProvider() {
  const [activeStep, setActiveStep] = useState(0);
  const [login, setLogin] = useState(true);
  const [errorMessagesSignUp, setErrorMessagesSignUp] = useState(objectsStepOne.form);
  const [errorMessageServerSignUp, setErrorMessagesServerSignUp] = useState('');
  const [formSignUp, setFormSignUp] = useState(objectsStepOne.form);

  useEffect(() => { }, [activeStep]);

  const empty = "";
  const space = " ";
  const defaultEmailErrorMessage = "Email precisa estar em formato válido";
  const stepInitial = 0;

  const handleNext = () => {
    const localActiveStep = activeStep + 1;
    setActiveStep(localActiveStep);
  };

  const handleReset = () => setActiveStep(stepInitial);

  function handleForm(event) {
    const { value, name } = event.target;
    setFormSignUp({ ...formSignUp, [name]: value });
  };

  const handleClearForm = () => setFormSignUp(objectsStepOne.form);

  const clearErrorOneMessageSignUp = (nameProperty) => {
    if (!nameProperty) return;

    const propertys = Object.keys(errorMessagesSignUp);

    if (propertys.includes(nameProperty)) {

      propertys.forEach(property => {
        const inputSelectedEqualsErrorType = errorMessagesSignUp.property !== '' && property === nameProperty;

        if (inputSelectedEqualsErrorType) {
          setErrorMessagesSignUp({ ...errorMessagesSignUp, [nameProperty]: '' });
        }
      });
    }
  }

  const clearAllErrorsSignUp = () => {
    setErrorMessagesSignUp(objectsStepOne.form);

    if (errorMessageServerSignUp !== "") {
      setErrorMessagesServerSignUp("");
    }
  };



  const validateFieldsFormStepOne = () => {
    if (formSignUp.name === empty) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, name: "Campo nome deve ser preenchido"
      });
      return true;
    }

    if (formSignUp.email === empty) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, email: "Campo e-mail deve ser preenchido"
      });
      return true;
    }

    if (formSignUp.email.includes(space)) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, email: defaultEmailErrorMessage
      });
      return true;
    }

    const positionAt = formSignUp.email.indexOf('@');

    if (positionAt === -1) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, email: defaultEmailErrorMessage
      });
      return true;
    }

    const positionDot = formSignUp.email.indexOf('.', positionAt);
    const pointNotFound = positionDot === -1;

    if (pointNotFound) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, email: defaultEmailErrorMessage
      });
      return true;
    }

    const emailEndsAtDot = formSignUp.email.length === positionDot + 1;

    if (emailEndsAtDot) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, email: defaultEmailErrorMessage
      });
      return true;
    }
    return false;
  }

  const validateFieldsFormStepTwo = () => {
    if (formSignUp.password === empty) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, password: "Campo senha deve ser preenchido"
      });
      return true;
    }

    if (formSignUp.password.length + 1 < 9) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, password: "A senha deve ter no mínimo 8 caracteres!"
      });
      return true;
    }

    if (formSignUp.password.includes(space)) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, password: "A senha não deve conter espaços"
      });
      return true;
    }

    if (formSignUp.confirmPassword === empty) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, confirmPassword: "Campo confirmar senha deve ser preenchido"
      });
      return true;
    }

    if (formSignUp.password !== formSignUp.confirmPassword) {
      setErrorMessagesSignUp({
        ...errorMessagesSignUp, confirmPassword: "As senhas não conferem!"
      });
      return true;
    }
    return false;
  }

  const showErrorsServerSignUp = (error) => {
    const { mensagem } = error.response.data;

    if (mensagem.includes('Email')) {
      setErrorMessagesSignUp({ ...errorMessagesSignUp, email: mensagem });
      handleReset();
      return;
    }

    if (mensagem.includes('nome')) {
      setErrorMessagesSignUp({ ...errorMessagesSignUp, name: mensagem });
      handleReset();
      return;
    }

    if (mensagem.includes('password')) {
      setErrorMessagesSignUp({ ...errorMessagesSignUp, password: mensagem });
      return;
    }

    setErrorMessagesServerSignUp("Erro interno no servidor");
  }

  async function handleRegisterUser(event) {
    event.preventDefault()

    const errorFieldsForm = validateFieldsFormStepTwo();

    if (errorFieldsForm) return;

    const { confirmPassword: _, ...user } = formSignUp;

    try {
      await api.post('/user', user);
      handleNext();
      handleClearForm();
      clearAllErrorsSignUp();

    } catch (error) {
      showErrorsServerSignUp(error);
    }
  };

  return {
    defaultEmailErrorMessage,
    activeStep,
    setActiveStep,
    login,
    setLogin,
    formSignUp,
    setFormSignUp,

    handleClearForm,
    handleNext,
    handleReset,
    handleForm,
    handleRegisterUser,

    validateFieldsFormStepOne,

    errorMessagesSignUp,
    errorMessageServerSignUp,
    clearAllErrorsSignUp,
    clearErrorOneMessageSignUp,

  };
};

export default useMainProvider;
