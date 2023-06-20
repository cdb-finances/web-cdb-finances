import './style.css';
import fileIcon from './assets/fileIcon.svg';
import filter from '../../PageClients/HeaderClientsTable/assets/filter.svg';
import searchIcon from './assets/magnifyGlassIcon.svg';
import api from '../../../services/api';
import useHome from '../../../hooks/useHome';
import { useState } from 'react';
import { getItem } from '../../../utils/storage';

function HeaderChargesTable() {

    const {
        setChargesList, getChargesList, isBillingTableLookupNotFound, setIsBillingTableLookupNotFound
    } = useHome();

    const [search, setSearch] = useState("");

    const chargesFilter = async () => {
        try {
            const { data: filteredCharges } = await api.get(`/charge?search=${search}`,
                { headers: { Authorization: `Bearer ${getItem("token")}`, } }
            );

            if (filteredCharges.length > 0) {
                if (isBillingTableLookupNotFound) setIsBillingTableLookupNotFound(false);

                setChargesList(filteredCharges);
                return;
            }

            setIsBillingTableLookupNotFound(true);
        } catch (error) {
            return console.log(error)
        }
    };

    const onKeyDownEnter = (e) => {
        if (e.key.toLowerCase() !== 'enter') {
            return;
        }
        chargesFilter()
    };

    return (
        <div className='flex-row align-center justify-between margin-t-32' style={{
            width: 'calc(100% - 11rem)',
            marginTop: '2rem'
        }}>
            <div className='flex-row'>
                <img src={fileIcon} alt='Icone de planilha' />
                <h1
                    onClick={getChargesList}
                    className='title1 gray2 pointer'
                    style={{ marginLeft: '2rem' }}>
                    Cobranças
                </h1>
            </div>

            <div className='flex-row' style={{ gap: '1.6rem' }}>

                <img
                    src={filter} alt='Icone de filtro' />
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={onKeyDownEnter}
                    placeholder='Pesquisa'
                    className='input-search gray3'
                />
                <img
                    onClick={chargesFilter}
                    className='glasseye-icon '
                    src={searchIcon}
                    alt="magnify glass icon" />

            </div>
        </div>
    )
}

export default HeaderChargesTable;
