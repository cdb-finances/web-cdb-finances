import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import imgSearchNotFound from './assets/search-error.svg';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useHome from '../../../hooks/useHome';
import api from '../../../services/api';
import ModalDeleteCharge from '../../General/ModalDeleteCharge';
import TableAnimation from "../../General/TableAnimation";
import btnDelete from './assets/btn-delete.svg';
import btnEdit from './assets/btn-edit.svg';
import btnOrderCharges from './assets/filter.svg';
import { getItem } from '../../../utils/storage';
import formatCentsIntoReais from "../../../utils/formatCentsIntoReais";
import './style.css';

export default function ChargesTable() {
  const { status } = useParams();

  const {
    chargeList, setChargesList, setIsModalChargeDetail, isModalDeleteCharge,
    setIsModalDeleteCharge, setCurrentCharge, updateRender,
    setIsModalEditRegisterCharge, isBillingTableLookupNotFound,
    setIsBillingTableLookupNotFound
  } = useHome();

  const [sortById, setSortById] = useState(true);
  const [sortByClient, setSortByClient] = useState(true);
  const [order, setOrder] = useState(1);
  const [dateOrder, setDateOrder] = useState('crescent');
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);

  function sortBynumber() {
    const result = [...chargeList]

    result.sort((a, b) => {
      const IdValueA = a.id
      const IdValueB = b.id

      return sortById ? IdValueA - IdValueB : IdValueB - IdValueA;
    })

    setChargesList(result)
  };

  function sortByname() {
    const result = [...chargeList]

    if (order === 1) {
      result.sort((a, b) => a.name.localeCompare(b.name));
      setOrder(-1);
      setChargesList(result);
      return;
    }

    result.sort((a, b) => b.name.localeCompare(a.name))
    setOrder(1);
    setChargesList(result);
    return;
  };

  function sortByDate() {

    const data = [...chargeList]

    const comparator = (a, b) => {
      const dataA = new Date(a.due_date.split('/').reverse().join('-'));
      const dataB = new Date(b.due_date.split('/').reverse().join('-'));
      if (dateOrder === 'crescent') {
        setDateOrder('decrescent');
        return dataA - dataB;
      } else {
        setDateOrder('crescent');
        return dataB - dataA;
      }
    };

    data.sort(comparator);
    return setChargesList(data)
  }

  function openModalDeleteCharge(charge) {
    setCurrentCharge(charge)
    setIsModalDeleteCharge(true)
  }

  function openModalChargeDetail(charge) {
    setIsModalChargeDetail(true);
    setCurrentCharge(charge);
    return
  }

  function openModalEditCharge(charge) {
    setIsModalEditRegisterCharge(true);
    setCurrentCharge(charge);
  }

  async function getChargesList() {

    const { data: allCharges } = await api.get('/charge', { headers: { Authorization: `Bearer ${getItem("token")}`, } });

    return allCharges;
  };

  async function getBillsPaid() {
    try {
      const { data: paidCharges } = (await api.get('/charge/paid', { headers: { Authorization: `Bearer ${getItem("token")}`, } }));

      return paidCharges;

    } catch (error) {
      setIsLoadingAnimation(true);
    }
  }

  async function getPendingCharges() {
    try {
      const { data: pendingCharges } = (await api.get('/charge/pending', { headers: { Authorization: `Bearer ${getItem("token")}`, } }));

      return pendingCharges;

    } catch (error) {
      setIsLoadingAnimation(true);
    }
  }

  async function getOverdueCharges() {
    try {
      const { data: overdueCharges } = (await api.get('/charge/expired', { headers: { Authorization: `Bearer ${getItem("token")}`, } }));

      return overdueCharges;

    } catch (error) {
      setIsLoadingAnimation(true);
    }
  }

  const charges = {
    get: {
      all: () => getChargesList(),
      paid: () => getBillsPaid(),
      pending: () => getPendingCharges(),
      expired: () => getOverdueCharges(),
    }
  }

  useEffect(() => {
    if (isBillingTableLookupNotFound) setIsBillingTableLookupNotFound(false);

    async function getChargesFromTable() {
      setIsLoadingAnimation(true);

      const tableCharges = await charges.get[status || "all"]();

      setChargesList(tableCharges);

      setIsLoadingAnimation(false);
    }

    getChargesFromTable();

  }, [status, updateRender]);

  if (isLoadingAnimation) {
    return <TableAnimation />;
  }

  if (isBillingTableLookupNotFound) {
    return <img src={imgSearchNotFound} alt="Busca não encontrada" />;
  }

  return (
    <TableContainer component={Paper} className='margin-t-32' sx={{
      width: 'calc(100% - 11rem)',
      borderRadius: '3rem'
    }}>
      {isModalDeleteCharge && <ModalDeleteCharge />}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >
              <div className='flex-row align-center' style={{ gap: '1rem' }}>
                <img
                  className='pointer'
                  onClick={() => {
                    setSortByClient(!sortByClient)
                    sortByname()
                  }
                  }
                  src={btnOrderCharges}
                  alt='Botão ordenar cobranças na tabela' />
                <span className='subtitle'>Cliente</span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex-row align-center' style={{ gap: '1rem' }}>
                <img
                  className='pointer'
                  onClick={() => {
                    setSortById(!sortById)
                    sortBynumber()
                  }
                  }
                  src={btnOrderCharges}
                  alt='Botão ordenar cobranças na tabela' />
                <span className='subtitle'>ID Cob.</span>
              </div>
            </TableCell>
            <TableCell>
              <span className='subtitle'>Valor</span>
            </TableCell>
            <TableCell>
              <div className='flex-row align-center' style={{ gap: '1rem' }}>
                <img
                  className='pointer'
                  onClick={() => { sortByDate() }}
                  src={btnOrderCharges}
                  alt='Botão ordenar cobranças na tabela' />
                <span className='subtitle'>Data de venc.</span>
              </div>
            </TableCell>
            <TableCell>
              <span className='subtitle'>Status</span>
            </TableCell>
            <TableCell>
              <span className='subtitle'>Descrição</span>
            </TableCell>
            <TableCell>
              <span className='subtitle'></span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            chargeList.map((charge) => (
              <TableRow
                key={charge.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className='pointer' component="th" scope="row">
                  <span
                    className='gray6 medium-body'
                    onClick={() => openModalChargeDetail(charge)}
                  >{charge.name}</span>
                </TableCell>
                <TableCell >
                  <span className='gray6 medium-body'>{charge.id}</span>
                </TableCell>
                <TableCell >
                  <span className='gray6 medium-body'>R$ {formatCentsIntoReais(charge.value)}</span>
                </TableCell>
                <TableCell >
                  <span className='gray6 medium-body'>{charge.due_date}</span>
                </TableCell>
                <TableCell>
                  {
                    charge.status === 'paga' ?
                      <span className='client-status pd-26 cyan bg-cyan'>Paga</span>
                      : charge.status === 'pendente' ? <span className='client-status pd-8 yellow bg-light-red'>Pendente</span> :
                        <span className='client-status pd-17 red bg-light-red'>Vencida</span>
                  }
                </TableCell>
                <TableCell >
                  <span className='gray6 medium-body'>{charge.description}</span>
                </TableCell>
                <TableCell>
                  <div className='flex-row' style={{ justifyContent: 'space-around' }}>
                    <img
                      src={btnEdit}
                      alt='Botão editar cobrança'
                      style={{ cursor: 'pointer' }}
                      onClick={() => openModalEditCharge(charge)}
                    />

                    <img
                      src={btnDelete}
                      alt='Botão remover cobrança'
                      style={{ cursor: 'pointer' }}
                      onClick={() => openModalDeleteCharge(charge)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody >
      </Table >

    </TableContainer >
  );
}
