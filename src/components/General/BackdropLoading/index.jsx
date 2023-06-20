import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';

export default function SimpleBackdrop({ openBackdrop, setOpenBackdrop }) {

  return (
    <div>
      <Backdrop
        sx={{
          color: 'rgb(218,1,117)', zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}