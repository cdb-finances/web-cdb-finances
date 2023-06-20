import IconChargePaid from "./assets/icon-charge-paid.svg";
import IconChargePending from "./assets/icon-charge-pending.svg";
import IconChargeExpected from "./assets/icon-charge-expected.svg";

export default {
  infoFrameCharges: {
    paid: {
      name: "paid",
      color: " #EEF7F7",
      image: IconChargePaid,
      title: "Cobranças Pagas",
      value: 0,
    },
    expired: {
      name: "expired",
      color: "#FFEFEF",
      image: IconChargePending,
      title: "Cobranças Vencidas",
      value: 0,
    },
    pending: {
      name: "pending",
      color: "#FCF6DC",
      image: IconChargeExpected,
      title: "Cobranças Previstas",
      value: 0,
    },
  }
}
