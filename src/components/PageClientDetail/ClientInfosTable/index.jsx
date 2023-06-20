import { createTheme, ThemeProvider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useHome from '../../../hooks/useHome';
import ClientIcon from './assets/client.svg';

export default function ClientInfosTable() {

  const theme = createTheme({
    palette: {
      divider: '#fff'
    }
  })

  const { currentClient, setIsModalEditRegisterClient } = useHome();

  return (
    <div className='clients-details margin-t-29'>
      <div className='client-title flex-row justify-start '>
        <img src={ClientIcon} />
        <h1 className='title1' style={{ marginLeft: '2.2rem' }}>{currentClient.name}</h1>
      </div>

      <div className='flex-column client-data margin-t-24'>
        <div className='flex-row justify-between'>
          <span className='title3-b'>Dados do cliente</span>
          <button className='bg-gray8 btn-cancel green width100'
            onClick={() => setIsModalEditRegisterClient(true)}
          >
            Editar cliente
          </button>
        </div>

        <ThemeProvider theme={theme}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span className='subtitle'>E-mail</span>
                  </TableCell>
                  <TableCell>
                    <span className='subtitle'>Telefone</span>
                  </TableCell>
                  <TableCell>
                    <span className='subtitle'>CPF</span>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <span className='body'>{currentClient.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className='body'>{currentClient.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className='body'>{currentClient.cpf}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableHead sx={{ marginTop: '57px' }}>
                <TableRow>
                  <TableCell>
                    <span className='subtitle'>Endereço</span>
                  </TableCell>
                  <TableCell>
                    <span className='subtitle'>Bairro</span>
                  </TableCell>
                  <TableCell>
                    <span className='subtitle'>Complemento</span>
                  </TableCell>
                  <TableCell>
                    <span className='subtitle'>CEP</span>
                  </TableCell>
                  <TableCell>
                    <span className='subtitle'>Cidade</span>
                  </TableCell>
                  <TableCell>
                    <span className='subtitle'>UF</span>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <span className='body'>{currentClient.address ? currentClient.address : '--'}</span>
                  </TableCell>
                  <TableCell>
                    <span className='body'>{currentClient.neighborhood ? currentClient.neighborhood : '--'}</span>
                  </TableCell>
                  <TableCell>
                    <span className='body'>{currentClient.complement ? currentClient.complement : '--'}</span>
                  </TableCell>
                  <TableCell>
                    <span className='body'>{currentClient.zip_code ? currentClient.zip_code : '--'}</span>
                  </TableCell>
                  <TableCell>
                    <span className='body'>{currentClient.city ? currentClient.city : '--'}</span>
                  </TableCell>
                  <TableCell>
                    <span className='body'>{currentClient.state ? currentClient.state : '--'}</span>
                  </TableCell></TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      </div>
    </div>
  )
}  