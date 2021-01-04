module.exports = function computeBalance(transactions = []) {
  let balance, totalDebit, totalCredit;

  totalDebit = transactions
    .filter(t => t.category === "debit")
    .reduce((acc, { amount }) => acc + amount, 0);

  totalCredit = transactions
    .filter(t => t.category === "credit")
    .reduce((acc, { amount }) => acc + amount, 0);

  balance = totalCredit - totalDebit;
  return balance;
};
