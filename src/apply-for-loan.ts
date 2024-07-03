import { SACInstallmentCalculator } from "./installment-calculator";
import { InstallmentRepository } from "./installment-repository";
import { MortgageLoan } from "./loan";
import { LoanRepository } from "./loan-repository";

export class ApplyForLoan {
  constructor(
    readonly loanRepository: LoanRepository,
    readonly installmentRepository: InstallmentRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (input.type === "mortgage") {
      const loan = MortgageLoan.create(
        input.amount,
        input.income,
        input.installments
      );
      const installment_calculator = new SACInstallmentCalculator();
      const installments = installment_calculator.calculate(loan);
      await this.loanRepository.save(loan);
      for await (const installment of installments) {
        await this.installmentRepository.save(installment);
      }
      return {
        loan_id: loan.loan_id,
      };
    }
    throw new Error("Loan type not available");
  }
}

type Input = {
  amount: number;
  income: number;
  installments: number;
  type: string;
};

type Output = {
  loan_id: string;
};
