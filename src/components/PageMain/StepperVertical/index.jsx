import useMain from '../../../hooks/useMain';
import Step1 from './assets/Step1.svg'
import Step2 from './assets/Step2.svg'
import Step3 from './assets/Step3.svg'
import './style.css';

function StepperVertical() {
  const { activeStep } = useMain();

  
  return(
    <div className='flex-row'>
      <div>
        { activeStep === 0 ? <img src={Step1} alt="Primeiro passo"/> : ""}
        { activeStep === 1 ? <img src={Step2} alt="Segundo passo"/> : ""}
        { activeStep === 2 ? <img src={Step3} alt="Terceiro passo"/> : ""}
      </div>
      <div className='stepper-text-box'>
        <div className='flex-column step-one'>
          <span className='green title3-b'>Cadastre-se</span>
          <span className='gray2 subtitle-login margin-t-8'>Por favor, escreva seu nome e e-mail</span>
        </div>
        <div className='flex-column step-two margin-t-25'>
          <span className='green title3-b'>Escolha uma senha</span>
          <span className='gray2 subtitle-login margin-t-8'>Escolha uma senha segura</span>
        </div>
        <div className='flex-column step-trhee margin-t-25'>
          <span className='green title3-b'>Cadastro realizado com sucesso</span>
          <span className='gray2 subtitle-login margin-t-8'>E-mail e senha cadastrados com sucesso</span>
        </div>
      </div>
    </div>
  )
}

export default StepperVertical;