import { useState } from "react";
import useHome from '../../../hooks/useHome';
import api from '../../../services/api';
import filter from './assets/filter.svg';
import people from './assets/people.svg';
import searchIcon from './assets/search-icon.svg';
import './style.css';
import { getItem } from "../../../utils/storage";

function HeaderClientsTable() {
  const {
    setIsModalRegisterClient, setCustomersFromCustomersPageTable, isCustomerTableSearchNotFound,
    setIsCustomerTableSearchNotFound
  } = useHome();

  const [search, setSearch] = useState("");

  const customerFilter = async () => {
    try {
      const { data: filteredCustomers } = await api.get(`/client?search=${search}`,
        { headers: { Authorization: `Bearer ${getItem("token")}`, } });

      if (filteredCustomers.length > 0) {
        if (isCustomerTableSearchNotFound) setIsCustomerTableSearchNotFound(false);

        setCustomersFromCustomersPageTable(filteredCustomers);
        return;
      }

      setIsCustomerTableSearchNotFound(true);

    } catch (error) {
      return console.log(error);
    }
  };

  const searchCustomersByFilter = ({ key }) => {
    if (key.toLowerCase() === 'enter') {
      customerFilter();
    }
  };

  return (
    <div className='flex-row align-center justify-between'
      style={{
        width: 'calc(100% - 11.4rem)',
        marginTop: '2rem'
      }}>
      <div className='flex-row'>
        <img src={people} alt='Icone de pessoas' />
        <h1 className='title1 gray2' style={{ marginLeft: '2rem' }}>Clientes</h1>
      </div>

      <div className='flex-row' style={{ gap: '1.6rem' }}>
        <button
          className='bg-pink flex-row align-center justify-center gray8'
          style={{
            cursor: 'pointer',
            width: '26.6rem',
            height: '3.3rem',
            borderRadius: '1rem'
          }}
          onClick={() => setIsModalRegisterClient(true)}
        >
          + Adicionar Cliente
        </button>

        <img src={filter} alt='Icone de filtro' />

        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={searchCustomersByFilter}
          placeholder='Pesquisa'
          className='input-search gray3'
        />
        <img
          onClick={customerFilter}
          className='glasseye-icon '
          src={searchIcon}
          alt="magnify glass icon"
        />
      </div>
    </div>
  )
}

export default HeaderClientsTable;
