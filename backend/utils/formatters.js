// Format currency
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format percentage
const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
};

// Format number with commas
const formatNumber = (number) => {
  return Number(number).toLocaleString('en-US');
};

module.exports = {
  formatCurrency,
  formatDate,
  formatPercentage,
  formatNumber,
};