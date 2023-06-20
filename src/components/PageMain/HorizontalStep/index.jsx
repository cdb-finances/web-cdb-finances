import useMain from '../../../hooks/useMain';
import './style.css';

export default function HorizontalStep() {
  const { activeStep } = useMain();

  return (
    <div className='flex-row horizontal-step'>
      <div className={activeStep === 0 ? 'bar bg-green' : 'bar bg-bar'}></div>
      <div className={activeStep === 1 ? 'bar bg-green' : 'bar bg-bar'}></div>
      <div className={activeStep === 2 ? 'bar bg-green' : 'bar bg-bar'}></div>
    </div>
  )
}