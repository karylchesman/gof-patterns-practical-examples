import {
  InstallmentCalculator,
  SACInstallmentCalculator,
} from "./installment-calculator";
import { CarLoan, Loan, MortgageLoan } from "./loan";

export interface LoanFactory {
  createLoan(amount: number, income: number, installments: number): Loan;
  createInstallmentCalculator(): InstallmentCalculator;
}

export class MortgageLoanfactory implements LoanFactory {
  createLoan(amount: number, income: number, installments: number): Loan {
    return MortgageLoan.create(amount, income, installments);
  }
  createInstallmentCalculator(): InstallmentCalculator {
    return new SACInstallmentCalculator();
  }
}

export class CarLoanfactory implements LoanFactory {
  createLoan(amount: number, income: number, installments: number): Loan {
    return CarLoan.create(amount, income, installments);
  }
  createInstallmentCalculator(): InstallmentCalculator {
    return new SACInstallmentCalculator();
  }
}
