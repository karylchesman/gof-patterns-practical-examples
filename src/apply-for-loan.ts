import { SACInstallmentCalculator } from "./installment-calculator";
import { InstallmentRepository } from "./installment-repository";
import { MortgageLoan } from "./loan";
import { LoanFactory } from "./loan-factory";
import { LoanRepository } from "./loan-repository";
import { RepositoryFactory } from "./repository-factory";

export class ApplyForLoan {
  private loanRepository: LoanRepository;
  private installmentRepository: InstallmentRepository;

  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly loanFactory: LoanFactory
  ) {
    this.loanRepository = repositoryFactory.createLoanRepository();
    this.installmentRepository =
      repositoryFactory.createInstallmentRepository();
  }

  async execute(input: Input): Promise<Output> {
    const loan = this.loanFactory.createLoan(
      input.amount,
      input.income,
      input.installments
    );
    const installment_calculator =
      this.loanFactory.createInstallmentCalculator();
    const installments = installment_calculator.calculate(loan);
    await this.loanRepository.save(loan);
    for await (const installment of installments) {
      await this.installmentRepository.save(installment);
    }
    return {
      loan_id: loan.loan_id,
    };
  }
}

type Input = {
  amount: number;
  income: number;
  installments: number;
};

type Output = {
  loan_id: string;
};
