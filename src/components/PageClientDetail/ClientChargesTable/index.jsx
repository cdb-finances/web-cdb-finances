import { createTheme, ThemeProvider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import useHome from '../../../hooks/useHome';
import api from '../../../services/api';
import btnOrderClients from './assets/btn-order-clients.svg';
import DeleteClient from './assets/delete-client.svg';
import EditClient from './assets/edit-client.svg';
import './style.css';
import { getItem } from '../../../utils/storage';
import formatCentsIntoReais from '../../../utils/formatCentsIntoReais';

export default function ClientChargesTable() {
  const { id } = useParams();

  const theme = createTheme({
    palette: {
      divider: '#fff'
    }
  })

  const { setIsModalEditRegisterCharge, setIsModalRegisterCharge,
    chargeList, setIsModalDeleteCharge, setCurrentCharge, updateRender } = useHome();

  const [order, setOrder] = useState('crescent');
  const [clientCharges, setClientCharges] = useState([]);

  const openModalDeleteCharge = (charge) => {
    setCurrentCharge(charge)
    setIsModalDeleteCharge(true)
  }

  const openModalEditCharge = (charge) => {
    setIsModalEditRegisterCharge(true);
    setCurrentCharge(charge);
  };

  const getClientCharges = async () => {
    try {
      const { data } = await api.get(`/charge/${id}`, { headers: { Authorization: `Bearer ${getItem("token")}`, } })

      let i = 1;
      data.forEach(charge => {
        charge.chargeId = i++
      })
      setClientCharges(data)
    } catch (error) {
      return console.log(error);
    }
  }

  async function getChargesList() {
    const { data: allCharges } = await api.get('/charge', { headers: { Authorization: `Bearer ${getItem("token")}`, } });

    return allCharges;
  };

  const orderById = () => {
    const data = [...clientCharges];

    const comparator = (a, b) => {
      const dataA = a.id;
      const dataB = b.id;

      if (order === 'crescent') {
        setOrder('decrescent');
        return dataA - dataB;
      } else {
        setOrder('crescent');
        return dataB - dataA;
      }
    };

    data.sort(comparator);
    return setClientCharges(data)
  }

  const orderByDate = () => {

    const data = [...clientCharges]

    const comparator = (a, b) => {
      const dataA = new Date(a.due_date.split('/').reverse().join('-'));
      const dataB = new Date(b.due_date.split('/').reverse().join('-'));

      if (order === 'crescent') {
        setOrder('decrescent');
        return dataA - dataB;
      } else {
        setOrder('crescent');
        return dataB - dataA;
      }
    };

    data.sort(comparator);
    return setClientCharges(data)
  }

  useEffect(() => {
    getChargesList();
    getClientCharges(chargeList);
  }, [updateRender])

  return (

    <div className='flex-column client-data clients-details margin-t-24'>
      <div className='flex-row justify-between'>
        <span className='title3-b'>Cobranças do cliente</span>
        <button className='bg-pink' onClick={() => setIsModalRegisterCharge(true)}>+ Nova cobrança</button>
      </div>
      <ThemeProvider theme={theme}>
        <TableContainer className='margin-t-32'>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <div className='flex-row align-center' style={{ gap: '1rem' }}>
                    <img
                      src={btnOrderClients}
                      alt='Botão ordenar clientes na tabela'
                      style={{ cursor: 'pointer' }}
                      onClick={() => orderById()}
                    />
                    <span className='subtitle'>ID Cob.</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex-row align-center' style={{ gap: '1rem' }}>
                    <img
                      src={btnOrderClients}
                      style={{ cursor: 'pointer' }}
                      onClick={() => orderByDate()}
                      alt='Botão ordenar clientes na tabela'
                    />
                    <span className='subtitle'>Data de venc.</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='subtitle'>Valor</span>
                </TableCell>
                <TableCell>
                  <span className='subtitle'>Status</span>
                </TableCell>
                <TableCell>
                  <span className='subtitle'>Descrição</span>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {
                clientCharges.length > 0 && clientCharges.map((charge) => {
                  return (
                    <TableRow key={charge.id}>
                      <TableCell>
                        <span className='gray6 medium-body'>{charge.chargeId}</span>
                      </TableCell>
                      <TableCell>
                        <span className='gray6 medium-body'>{charge.due_date}</span>
                      </TableCell>
                      <TableCell>
                        <span className='gray6 medium-body'>{`R$ ${formatCentsIntoReais(charge.value)}`}</span>
                      </TableCell>
                      <TableCell>
                        <span className='gray6 medium-body'>
                          {
                            charge.status === 'paga' ?
                              <span className='client-status pd-26 cyan bg-cyan'>Paga</span>
                              : charge.status === 'pendente' ? <span className='client-status pd-8 yellow bg-light-red'>Pendente</span> :
                                <span className='client-status pd-17 red bg-light-red'>Vencida</span>
                          }
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className='gray6 medium-body'>{charge.description.slice(0, 8)} ...</span>
                      </TableCell>
                      <TableCell>
                        <div className='flex-row' style={{ justifyContent: 'space-around' }}>
                          <img
                            src={EditClient}
                            alt='Botão editar cobrança'
                            style={{ cursor: 'pointer' }}
                            onClick={() => openModalEditCharge(charge)}
                          />

                          <img
                            src={DeleteClient}
                            alt='Botão remover cobrança'
                            style={{ cursor: 'pointer' }}
                            onClick={() => openModalDeleteCharge(charge)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  )
}  