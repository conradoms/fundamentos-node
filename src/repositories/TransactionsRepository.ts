import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income: number = this.transactions.reduce((totalIncome, element) => {
      if (element.type === 'income') {
        return totalIncome + element.value;
      }

      return totalIncome;
    }, 0);

    const outcome: number = this.transactions.reduce(
      (totalOutcome, element) => {
        if (element.type === 'outcome') {
          return totalOutcome + element.value;
        }

        return totalOutcome;
      },
      0,
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
