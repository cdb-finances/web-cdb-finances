import HorizontalStep from '../../components/PageMain/HorizontalStep';
import Login from '../../components/PageMain/Login';
import StepOne from '../../components/PageMain/StepOne';
import StepTrhee from '../../components/PageMain/StepTrhee';
import StepTwo from '../../components/PageMain/StepTwo';
import StepperVertical from '../../components/PageMain/StepperVertical';
import useMain from '../../hooks/useMain';
import './App.css';

export default function Main() {
  const { login, activeStep } = useMain();

  return (
    <div className={`container ${login ? 'container-login' : ''}`}>
      {!login && <div className="stepper">
        <div className="flex-row justify-center margin-t-172">
          <StepperVertical />
        </div>
      </div>}
      {login && <>
        <div className='login' />
      </>}
      <div className="form flex-column justify-between center">
        <div>
          {!login && <>
            {activeStep === 0 && <StepOne />}
            {activeStep === 1 && <StepTwo />}
            {activeStep === 2 && <StepTrhee />}
          </>}
          {login && <Login />}
        </div>
        {!login &&
          <div className='flex-column align-center margin-top-180'>
            <HorizontalStep />
          </div>
        }
      </div>
    </div>
  )
}
