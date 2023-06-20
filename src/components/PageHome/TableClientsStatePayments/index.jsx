import './style.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

function TableClientsStatePayment({ infoClient }) {
  const navigateTo = useNavigate();

  const { rows } = infoClient;

  const firstCharge = 0;
  const lastCharge = 4;

  const controlSizeTable = (rows) => {
    const size = `${controlNumberLines(rows).length * 52.91 + 162}px`;
    return size;
  }

  const controlNumberLines = (rows) => {
    return rows.slice(firstCharge, lastCharge);
  }

  const handleSeeAlls = () => {
    navigateTo(`/Clients/${infoClient.status}`);
  }

  return (
    <TableContainer sx={{
      width: '556px', borderRadius: "30px", display: "flex", maxHeight: controlSizeTable(rows),
      flexDirection: "column", alignItems: "center"
    }} component={Paper}>
      <div className='client-card'>
        <img src={infoClient.img} alt="People" />
        <div className='flex-row' style={{ gap: '8px' }}>
          <h2 className='title3'>{infoClient.title}</h2>
        </div>
        <span
          className='bg-light-red title4'
          style={{
            padding: "2px 15px",
            borderRadius: "8px",
            color: `${infoClient.color}`,
            backgroundColor: `${infoClient.bgColor}`
          }}
        >
          {infoClient.total}
        </span>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><span className='subtitle'>Clientes</span></TableCell>
            <TableCell align="center"><span className='subtitle'>ID do clie.</span></TableCell>
            <TableCell align="center"><span className='subtitle'>CPF</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.length > 0 &&
            controlNumberLines(rows).map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' component="th" scope="row">
                  <span className='gray6 medium-body'>{row.name && row.name.slice(0, 15)}</span>
                </TableCell>
                <TableCell align="center"><span className='gray6 medium-body'>{row.id}</span></TableCell>
                <TableCell align="center"><span className='gray6 medium-body'>{row.cpf}</span></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <span className='pink table-link pointer'
        style={{ textDecoration: 'underline' }}
        onClick={handleSeeAlls}
      >
        Ver todos
      </span>
    </TableContainer>
  );
}

export default TableClientsStatePayment;
