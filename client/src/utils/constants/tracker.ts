const YEARS: { name: string; value: string | number }[] = [];

const currYear = Number(new Date().getFullYear());

for (let i = currYear - 3; i < currYear + 10; i++) {
  YEARS.push({
    name: String(i),
    value: String(i),
  });
}

const MONTHS = [
  { name: "January", value: "01" },
  { name: "February", value: "02" },
  { name: "March", value: "03" },
  { name: "April", value: "04" },
  { name: "May", value: "05" },
  { name: "June", value: "06" },
  { name: "July", value: "07" },
  { name: "August", value: "08" },
  { name: "September", value: "09" },
  { name: "October", value: "10" },
  { name: "November", value: "11" },
  { name: "December", value: "12" },
];

export { MONTHS, YEARS };
