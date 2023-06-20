import './style.css';
import useHome from '../../../hooks/useHome';
import ModalDeleteCharge from '../../General/ModalDeleteCharge';
import ClientInfosTable from '../ClientInfosTable';
import ClientChargesTable from '../ClientChargesTable';

export default function ClientsDetails() {

  const { isModalDeleteCharge } = useHome();

  return (
    <>
      {isModalDeleteCharge && <ModalDeleteCharge />}
      <ClientInfosTable />
      <ClientChargesTable />
    </>
  )
}  