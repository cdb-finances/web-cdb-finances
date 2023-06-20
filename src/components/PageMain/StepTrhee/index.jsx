import CheckSignUp from '../../../assets/check-sign-up.svg';
import useMain from '../../../hooks/useMain';
import './style.css';

function StepTrhee() {
  const { login, setLogin } = useMain();

  return (
    <div className='flex-column margin-t-180'>
      <div className='flex-column box center justify-center align-center'>
        <img src={CheckSignUp} alt='Check' />
        <span className='title2 gray1 margin-t-24'>Cadastro realizado com sucesso!</span>
      </div>
      <button className='center bg-pink margin-t-30 btn-login' onClick={() => setLogin(!login)}>Ir para Login</button>
    </div>
  )
}

export default StepTrhee;
