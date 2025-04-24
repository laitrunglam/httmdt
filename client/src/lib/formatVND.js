export const formatVND = (amount) => {
  const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  let formatted = formatter.format(amount);
  formatted = formatted.replace(/\./g, ',');
  return formatted;
};