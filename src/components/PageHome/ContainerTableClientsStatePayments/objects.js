import expiredIcon from './assets/expired-icon.svg';
import paidIcon from './assets/paid-icon.svg';


export default {
  infoChangesStates: {
    expired: {
      img: expiredIcon,
      bgColor: "#FFEFEF",
      color: '#971D1D',
      status: "defaulter",
      title: "Clientes Inadimplentes",
      total: 0,
      rows: []
    },
    paid: {
      img: paidIcon,
      bgColor: " #EEF7F7",
      color: '#1FA7AF',
      status: "in-day",
      title: "Clientes em dia",
      total: 0,
      rows: []
    },
  }
}
