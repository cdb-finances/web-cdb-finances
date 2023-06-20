export default function formatCentsIntoReais(value) {
  let numberInitial = "";
  let count = 0;

  const real = ((parseInt(value, 10) / 100).toFixed(2)).replace(".", ",");

  if (real.length <= 6) return real;

  const final = real.slice(-3);
  const rest = (((real.slice(0, real.length - 3)).split("")).reverse()).join("");

  for (const number of rest) {
    count++;

    numberInitial += number;

    if (count === 3) {
      count = 0;
      numberInitial += ".";
    }
  }

  const ifThereIsAPointAtTheBeginning = numberInitial.split("").reverse().join("") + final;

  let formattedNumber = ifThereIsAPointAtTheBeginning;

  if (ifThereIsAPointAtTheBeginning[0] === ".") {
    formattedNumber = ifThereIsAPointAtTheBeginning.slice(1, ifThereIsAPointAtTheBeginning.length);
  }

  return formattedNumber;
}
