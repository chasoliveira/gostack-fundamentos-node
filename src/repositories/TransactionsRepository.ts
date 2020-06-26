import Transaction from '../models/Transaction';

interface Result {
  transactions: Transaction[];
  balance: Balance;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Result {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  private sumByType(type: 'income' | 'outcome') {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .reduce((total, current) => total + current.value, 0);
  }

  public getBalance(): Balance {
    const income = this.sumByType('income');
    const outcome = this.sumByType('outcome');
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
