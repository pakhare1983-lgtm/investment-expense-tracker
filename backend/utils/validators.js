// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 6 characters)
const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Currency validation
const isValidCurrency = (currency) => {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD'];
  return validCurrencies.includes(currency);
};

// Amount validation
const isValidAmount = (amount) => {
  return amount && Number(amount) > 0;
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidCurrency,
  isValidAmount,
};