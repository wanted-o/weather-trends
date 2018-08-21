export const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

export const parseWeatherFromTxt = (data) => {
  const keys = [
    'yyyy',
    'mm',
    'tmax',
    'tmin',
    'af',
    'rain',
    'sun',
  ];
  let parsedArrayOfWeather = [];
  let cityName = '';
  const splitByLines = data.split('\n');
  let notParse = true;
  splitByLines.forEach((line, indx) => {
    if (indx === 0) cityName = line;
    const el = line.replace(/ {2,}/g, ' ').split(' ');
    if (el[1] === 'degC' && notParse) {
      notParse = false;
      return;
    }
    if (notParse) return;
    const temp = {};
    keys.forEach((key, index) => {
      temp[`${key}`] = el[index + 1];
    });
    parsedArrayOfWeather.push(temp);
  });
  parsedArrayOfWeather = groupBy(parsedArrayOfWeather, item => item.yyyy);
  const availableYears = [...parsedArrayOfWeather.keys()];
  return { cityName, parsedArrayOfWeather, availableYears };
};

export default parseWeatherFromTxt;
