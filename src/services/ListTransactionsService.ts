import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ListTransaction {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionService {
  private transactionRepository: TransactionsRepository;

  constructor(transactionRepository: TransactionsRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(): ListTransaction {
    const transactions = this.transactionRepository.all();
    const balance = this.transactionRepository.getBalance();

    return { balance, transactions };
  }
}

export default ListTransactionService;
