import { InstallmentRepository } from "./installment-repository";
import { LoanRepository } from "./loan-repository";
import { RepositoryFactory } from "./repository-factory";

export class GetLoan {
  private loanRepository: LoanRepository;
  private installmentRepository: InstallmentRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.loanRepository = repositoryFactory.createLoanRepository();
    this.installmentRepository =
      repositoryFactory.createInstallmentRepository();
  }

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
