const getNumber = (value = 0) => {
  return Number(parseFloat(value).toFixed(2));
};

const getNumberTwo = (value = 0) => {
  return parseFloat(value).toFixed(2);
};

export { getNumber, getNumberTwo };
