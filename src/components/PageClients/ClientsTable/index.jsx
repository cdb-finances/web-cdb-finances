import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHome from '../../../hooks/useHome';
import api from '../../../services/api';
import TableAnimation from "../../General/TableAnimation";
import btnAddCharge from './assets/btn-add-charge.svg';
import btnOrderClients from './assets/btn-order-clients.svg';
import imgSearchNotFound from "./assets/img-search-not-found.svg";
import "./style.css";
import { getItem } from '../../../utils/storage';

export default function ClientsTable({ setShowAllClients }) {
  const { status } = useParams();
  const navigate = useNavigate();

  const {
    customersFromCustomersPageTable, setCustomersFromCustomersPageTable, setIsModalRegisterCharge,
    setCurrentClient, updateRender, isCustomerTableSearchNotFound, setIsCustomerTableSearchNotFound
  } = useHome();

  const [order, setOrder] = useState(1);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);

  function sortByname() {
    const data = [...customersFromCustomersPageTable];

    if (order === 1) {
      setCustomersFromCustomersPageTable([...data].sort((a, b) => a.name.localeCompare(b.name)));
      setOrder(-1)
      return
    }

    setCustomersFromCustomersPageTable([...data].sort((a, b) => b.name.localeCompare(a.name)));
    setOrder(1);
    return
  };

  function openModalRegisterCharge(client) {
    setIsModalRegisterCharge(true);
    setCurrentClient(client);
    return;
  }

  function openClientDetail(client) {
    setShowAllClients(false);
    navigate(`/clients/detalhamento/${client.id}/${client.name}`);
    setCurrentClient(client);
    return;
  }

  async function getClients() {
    try {

      const { data: allClients } = await api.get('/client', { headers: { Authorization: `Bearer ${getItem("token")}`, } })
      return allClients;

    } catch (error) {
      return console.log(error);
    }
  }

  async function getCustomersUpToDate() {
    try {
      const { data: clientsInDay } = (await api.get('/client/in-day', { headers: { Authorization: `Bearer ${getItem("token")}`, } }));
      return clientsInDay;

    } catch (error) {
      setIsLoadingAnimation(true);
    }
  }

  async function getDelinquentCustomers() {
    try {
      const { data: clientsDefaulter } = (await api.get('/client/defaulter', { headers: { Authorization: `Bearer ${getItem("token")}`, } }));

      return clientsDefaulter;

    } catch (error) {
      setIsLoadingAnimation(true);
    }
  }

  const clients = {
    get: {
      all: () => getClients(),
      inday: () => getCustomersUpToDate(),
      defaulter: () => getDelinquentCustomers(),
    }
  }

  useEffect(() => {
    if (isCustomerTableSearchNotFound) setIsCustomerTableSearchNotFound(false);

    async function getChargesFromTable() {
      setIsLoadingAnimation(true);

      const tableCustomers = await clients.get[status.replaceAll('-', '') || "all"]();

      setCustomersFromCustomersPageTable(tableCustomers);

      setIsLoadingAnimation(false);
    }

    getChargesFromTable();

  }, [status, updateRender]);

  if (isLoadingAnimation) {
    return <TableAnimation />;
  }

  if (isCustomerTableSearchNotFound) {
    return <img src={imgSearchNotFound} alt="Busca não encontrada" />;
  }

  return (
    <TableContainer component={Paper} className='margin-t-32' sx={{
      width: 'calc(100% - 11rem)',
      borderRadius: '3rem'
    }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <div className='flex-row align-center' style={{ gap: '1rem' }}>

                <img
                  src={btnOrderClients}
                  alt='Botão ordenar clientes na tabela'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    sortByname()
                  }} />

                <span className='subtitle'>Cliente</span>
              </div>
            </TableCell>
            <TableCell>
              <span className='subtitle'>CPF</span>
            </TableCell>
            <TableCell>
              <span className='subtitle'>E-mail</span>
            </TableCell>
            <TableCell>
              <span className='subtitle'>Telefone</span>
            </TableCell>
            <TableCell>
              <span className='subtitle'>Status</span>
            </TableCell>
            <TableCell align="center">
              <span className='subtitle'>Criar cobrança</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customersFromCustomersPageTable && customersFromCustomersPageTable.map(client => (
            <TableRow
              key={client.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}>
                <span
                  className='gray6 medium-body'
                  onClick={() => openClientDetail(client)}
                >{client.name.split(' ')[0]}
                </span>
              </TableCell>
              <TableCell >
                <span className='gray6 medium-body'>{client.cpf}</span>
              </TableCell>
              <TableCell>
                <span className='gray6 medium-body'>{client.email}</span>
              </TableCell>
              <TableCell className='pointer'>
                {

                  <span className='gray6 medium-body'>{client.phone}</span>
                }
              </TableCell>
              <TableCell>
                {
                  client.defaulter ?
                    <span className='client-status pd-8 red bg-light-red'>Inadimplente</span>
                    :
                    <span className='client-status pd-26 cyan bg-cyan'>Em dia</span>
                }
              </TableCell>

              <TableCell align="center">
                <img
                  src={btnAddCharge}
                  alt='Botão adicionar cobrança'
                  style={{ cursor: 'pointer' }}
                  onClick={() => openModalRegisterCharge(client)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
