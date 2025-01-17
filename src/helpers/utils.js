import moment from 'moment';

export const isIterableArray = array => Array.isArray(array) && !!array.length;

//===============================
// Store
//===============================
export const getItemFromStore = (key, defaultValue, store = localStorage) =>
  JSON.parse(store.getItem(key)) || defaultValue;
export const setItemToStore = (key, payload, store = localStorage) => store.setItem(key, JSON.stringify(payload));
export const getStoreSpace = (store = localStorage) =>
  parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));

//===============================
// Moment
//===============================
export const getDuration = (startDate, endDate) => {
  if (!moment.isMoment(startDate)) throw new Error(`Start date must be a moment object, received ${typeof startDate}`);
  if (endDate && !moment.isMoment(endDate))
    throw new Error(`End date must be a moment object, received ${typeof startDate}`);

  return `${startDate.format('ll')} - ${endDate ? endDate.format('ll') : 'Present'} • ${startDate.from(
    endDate || moment(),
    true
  )}`;
};

export const numberFormatter = (number, fixed = 2) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(number)) >= 1.0e9
    ? (Math.abs(Number(number)) / 1.0e9).toFixed(fixed) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(number)) >= 1.0e6
      ? (Math.abs(Number(number)) / 1.0e6).toFixed(fixed) + 'M'
      : // Three Zeroes for Thousands
      Math.abs(Number(number)) >= 1.0e3
        ? (Math.abs(Number(number)) / 1.0e3).toFixed(fixed) + 'K'
        : Math.abs(Number(number)).toFixed(fixed);
};

//===============================
// Colors
//===============================
export const hexToRgb = hexValue => {
  let hex;
  hexValue.indexOf('#') === 0 ? (hex = hexValue.substring(1)) : (hex = hexValue);
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  );
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

export const rgbColor = (color = colors[0]) => `rgb(${hexToRgb(color)})`;
export const rgbaColor = (color = colors[0], alpha = 0.5) => `rgba(${hexToRgb(color)},${alpha})`;

export const colors = [
  '#2c7be5',
  '#00d97e',
  '#e63757',
  '#39afd1',
  '#fd7e14',
  '#02a8b5',
  '#727cf5',
  '#6b5eae',
  '#ff679b',
  '#f6c343'
];

export const colorsWithOpacity = [
  '#2c7be550',
  '#00d97e50',
  '#e6375750',
  '#39afd150',
  '#fd7e1450',
  '#02a8b550',
  '#727cf550',
  '#6b5eae50',
  '#ff679b50',
  '#f6c34350'
];

export const themeColors = {
  primary: '#2c7be5',
  secondary: '#748194',
  success: '#00d27a',
  info: '#27bcfd',
  warning: '#f5803e',
  danger: '#e63757',
  light: '#f9fafd',
  dark: '#0b1727'
};



export const grays = {
  white: '#fff',
  100: '#f9fafd',
  200: '#edf2f9',
  300: '#d8e2ef',
  400: '#b6c1d2',
  500: '#9da9bb',
  600: '#748194',
  700: '#5e6e82',
  800: '#4d5969',
  900: '#344050',
  1000: '#232e3c',
  1100: '#0b1727',
  black: '#000'
};

export const darkGrays = {
  white: '#fff',
  1100: '#f9fafd',
  1000: '#edf2f9',
  900: '#d8e2ef',
  800: '#b6c1d2',
  700: '#9da9bb',
  600: '#748194',
  500: '#5e6e82',
  400: '#4d5969',
  300: '#344050',
  200: '#232e3c',
  100: '#0b1727',
  black: '#000'
};

export const getGrays = isDark => (isDark ? darkGrays : grays);

export const rgbColors = colors.map(color => rgbColor(color));
export const rgbaColors = colors.map(color => rgbaColor(color));

//===============================
// Echarts
//===============================
export const getPosition = (pos, params, dom, rect, size) => ({
  top: pos[1] - size.contentSize[1] - 10,
  left: pos[0] - size.contentSize[0] / 2
});

//===============================
// E-Commerce
//===============================
export const calculateSale = (base, less = 0, fix = 2) => (base - base * (less / 100)).toFixed(fix);
export const getTotalPrice = (cart, baseItems) =>
  cart.reduce((accumulator, currentValue) => {
    const { id, quantity } = currentValue;
    const { price, sale } = baseItems.find(item => item.id === id);
    return accumulator + calculateSale(price, sale) * quantity;
  }, 0);

//===============================
// Helpers
//===============================
export const getPaginationArray = (totalSize, sizePerPage) => {
  const noOfpages = Math.ceil(totalSize / sizePerPage);
  const array = [];
  let pageNo = 1;
  while (pageNo <= noOfpages) {
    array.push(pageNo);
    pageNo = pageNo + 1;
  }
  return array;
};

export const capitalize = str => (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, ' ');

export const fetcher = (params) => {
  debugger;
  return fetch(params.url)
    .then(response => response.json())
    .then(result => result)
};

export const evaluatePergentageBetweenTwoNumber = (startValue, endValue) => {
  return Number.parseInt(((endValue - startValue) / startValue) * 100);
}

export async function getItalyMapWithRegion() {
  await fetch('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson').then(res => {
    return res.json();
  })
};

export const convertDateFromMoment = (momentDate) => {
  var day = momentDate.date() < 10 ? "0" + momentDate.date() : momentDate.date();
  var month = (momentDate.month() + 1) < 10 ? "0" + (momentDate.month() + 1) : (momentDate.month() + 1);
  return day + "-" + month + "-" + momentDate.year();
}

export const convertDateFromString = (stringDate) => {
  return convertDateFromMoment(moment(stringDate));

}

export const convertInArrayDateFromMoment = (momentDate) => {
  var day = momentDate.date() < 10 ? "0" + momentDate.date() : momentDate.date();
  var month = (momentDate.month() + 1) < 10 ? "0" + (momentDate.month() + 1) : (momentDate.month() + 1);
  return [day, month, momentDate.year()];
}

export const convertMonthFromNumberToString = (month) => {

  switch (Number.parseInt(month)) {
    case 1:
      return 'Gen';
      break;
    case 2:
      return 'Feb';
      break;
    case 3:
      return 'mar';
      break;
    case 4:
      return 'Apr';
      break;
    case 5:
      return 'Mag';
      break;
    case 6:
      return 'Giu';
      break;
    case 7:
      return 'Lug';
      break;
    case 8:
      return 'Ago';
      break;
    case 9:
      return 'Set';
      break;
    case 10:
      return 'Ott';
      break;
    case 11:
      return 'Nov';
      break;
    case 12:
      return 'Dic';
      break;
    default:
      return 'Err';
      break;
  }
}




