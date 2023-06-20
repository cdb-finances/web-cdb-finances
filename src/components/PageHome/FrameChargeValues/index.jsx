import formatCentsIntoReais from "../../../utils/formatCentsIntoReais";
import './style.css';

function FrameChargeValues({ infoCharge }) {
  const { name, color, image, title, value } = infoCharge;

  return (
    <div className="frame-charge-values flex-row" style={{ backgroundColor: color, }}>
      <img className="align-self-center" src={image} alt={name} />
      <div className="flex-column justify-between width-100-percent align-center">
        <h1 className="title3-b gray2">{title}</h1>
        <h2 className="title2 gray2">R$ {formatCentsIntoReais(value)}</h2>
      </div>
    </div>
  );
}

export default FrameChargeValues;
