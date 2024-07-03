import { InstallmentRepository } from "./installment-repository";
import { LoanRepository } from "./loan-repository";

export class GetLoan {
  constructor(
    readonly loanRepository: LoanRepository,
    readonly installmentRepository: InstallmentRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const loan = await this.loanRepository.getById(input.loan_id);
    const installments = await this.installmentRepository.listByLoanId(
      loan.loan_id
    );
    return {
      amount: loan.amount,
      income: loan.income,
      installments: installments.map((installment) => ({
        amortization: installment.amortization,
        amount: installment.amount,
        balance: installment.balance,
        interest: installment.interest,
        number: installment.number,
      })),
    };
  }
}

type Input = {
  loan_id: string;
};

type Output = {
  amount: number;
  income: number;
  installments: {
    number: number;
    amount: number;
    amortization: number;
    interest: number;
    balance: number;
  }[];
};
