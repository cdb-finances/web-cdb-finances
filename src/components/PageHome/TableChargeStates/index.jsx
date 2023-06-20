import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import formatCentsIntoReais from "../../../utils/formatCentsIntoReais.js";
import './style.css';

function TableChargeStates({ infoCharge }) {
  const { rows } = infoCharge;

  const firstCharge = 0;
  const lastCharge = 4;

  const navigateTo = useNavigate();

  const controlSizeTable = (rows) => {
    const size = `${controlNumberLines(rows).length * 52.91 + 162}px`;
    return size;
  }

  const controlNumberLines = (rows) => {
    return rows.slice(firstCharge, lastCharge);
  }

  const handleSeeAlls = () => {
    navigateTo(`/Charges/${infoCharge.typeOfCharge}`);
  }

  return (
    <TableContainer sx={{
      width: '360px', maxHeight: controlSizeTable(rows), borderRadius: "30px", display: "flex",
      flexDirection: "column", alignItems: "center"
    }} component={Paper}>
      <div className='client-card'>
        <h2 className='title3'>{infoCharge.title}</h2>
        <span
          className='bg-light-red title4'
          style={{
            padding: "2px 15px",
            borderRadius: "8px",
            color: `${infoCharge.color}`,
            backgroundColor: `${infoCharge.bgColor}`
          }}
        >
          {infoCharge.total}
        </span>
      </div>

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><span className='subtitle'>Cliente</span></TableCell>
            <TableCell align="center"><span className='subtitle'>ID da cob.</span></TableCell>
            <TableCell align="center"><span className='subtitle'>Valor</span></TableCell>
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
                  <span className='gray6 medium-body'>{row.name.slice(0, 15)}</span>
                </TableCell>
                <TableCell align="center"><span className='gray6 medium-body'>{row.id}</span></TableCell>
                <TableCell align="center"><span className='gray6 medium-body'>R$ {formatCentsIntoReais(row.value)}</span></TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
      <span className='pink table-link'
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={handleSeeAlls}
      >
        Ver todos
      </span>
    </TableContainer>
  );
}
export default TableChargeStates;
