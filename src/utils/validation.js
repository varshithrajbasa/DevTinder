const validation = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (!data[field]) {
      return false;
    }
  }
  return true;
};

module.exports = validation;