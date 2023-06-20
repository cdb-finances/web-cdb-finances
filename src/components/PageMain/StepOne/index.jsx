import useMain from '../../../hooks/useMain';
import './style.css';

function StepOne() {
  const {
    login, setLogin, handleNext, formSignUp, handleForm, validateFieldsFormStepOne,
    errorMessagesSignUp, clearAllErrorsSignUp, clearErrorOneMessageSignUp, handleClearForm,
  } = useMain();

  const handleBtnContinueRegister = async (e) => {
    e.preventDefault();

    const errorFieldsForm = validateFieldsFormStepOne();

    if (errorFieldsForm) return;

    handleNext();
  }

  const handleLinkRedirectSignUp = () => {
    setLogin(!login);
    handleClearForm();
    clearAllErrorsSignUp();
  }

  return (
    <div className="step-one flex-row align-center margin-t-208">
      <form className="flex-column step-one" onSubmit={handleBtnContinueRegister}>
        <span className="title2 gray1 center">Adicione seus dados</span>
        <label className="medium-body gray3 margin-t-32">Nome*</label>
        <input
          className='input margin-t-6'
          placeholder="Digite seu nome"
          name='name'
          value={formSignUp?.name}
          onChange={handleForm}
          onFocus={() => clearErrorOneMessageSignUp('name')}
        />
        <span className='red-error margin-t-6 medium-body'>{errorMessagesSignUp.name}</span>
        <label className="medium-body gray3 margin-t-20">E-mail*</label>
        <input
          className='input margin-t-6'
          placeholder="Digite seu e-mail"
          name='email'
          value={formSignUp?.email}
          onChange={handleForm}
          onFocus={() => clearErrorOneMessageSignUp('email')}
        />
        <span className='red-error margin-t-6 medium-body'>{errorMessagesSignUp.email}</span>
        <button className="bg-pink btn center margin-t-46">Continuar</button>
        <span className="gray2 margin-t-15 center subtitle-login">
          Já possui uma conta? Faça seu
          <a className='link pink'
            onClick={handleLinkRedirectSignUp}
          > Login</a>
        </span>
      </form>
    </div>
  );
}

export default StepOne;
