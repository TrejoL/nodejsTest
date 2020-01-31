const info = text => {
  console.log('INFO', text);
  return text;
};
// arrow function
const error = text => {
  console.log('ERROR', text);
  return text;
};

// exportacion parcial
module.exports.info = info;
module.exports.error = error;
// exportacion global
// module.exports = { info, error };
