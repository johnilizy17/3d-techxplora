
export const cashFormat = (x: any, numb?: any) => {
  if (x) {
    let number = x.toString().replace(",", "")
    if (numb) {
      number = parseFloat(number) * numb
    }
    return `₦${parseFloat(number).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  return "₦0.00"
};


export const cashFormat2 = (x: any, numb?: any) => {
  if (x) {
    let number = x.toString().replace(",", "");
    if (numb) {
      number = parseFloat(number) * numb;
    }

    number = parseFloat(number); // Ensure number is a float

    const formattedNumber = number % 1 === 0 // Check if it's a whole number
      ? number.toLocaleString() // Format whole numbers without decimals
      : number.toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format with one decimal


    return `${formattedNumber}`; // Remove extra  "0"
  }
  return "0.00";
};


export function nFormatterNaira(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast(item => num >= item.value);
  const figure = item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
  return `₦${figure}`
}

export function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast(item => num >= item.value);
  const figure = item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
  return figure
}
