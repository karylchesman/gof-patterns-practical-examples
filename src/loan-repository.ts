import { Loan } from "./loan";

export interface LoanRepository {
  save(loan: Loan): Promise<void>;
  getById(loan_id: string): Promise<Loan>;
}

export class LoanRepositoryMemory implements LoanRepository {
  loans: Loan[];

  constructor() {
    this.loans = [];
  }

  async save(loan: Loan): Promise<void> {
    this.loans.push(loan);
  }

  async getById(loan_id: string): Promise<Loan> {
    const loan = this.loans.find((loan) => loan.loan_id === loan_id);
    if (!loan) throw new Error("Loan not found");
    return loan;
  }
}
