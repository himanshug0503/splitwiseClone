export const calculateBalances = (transactions, userId) => {
  let balance = 0;
  transactions.forEach((txn) => {
    if (txn.paidBy === userId) {
      balance += txn.amount / txn.participants.length;
    } else if (txn.participants.includes(userId)) {
      balance -= txn.amount / txn.participants.length;
    }
  });
  return balance;
};
