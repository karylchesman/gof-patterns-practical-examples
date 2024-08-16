import currency from "currency.js";
import { Installment } from "./installment";
import { Loan } from "./loan";

export interface InstallmentCalculator {
  calculate(loan: Loan): Installment[];
}

export class SACInstallmentCalculator implements InstallmentCalculator {
  calculate(loan: Loan): Installment[] {
    const installments: Installment[] = [];
    let balance = currency(loan.amount);
    let rate = loan.rate / 100 / 12;
    let installment_number = 1;
    let amortization = currency(balance.value / loan.installments);
    while (balance.value > 0.1) {
      let interest = currency(balance.value * rate);
      let updated_balance = currency(balance.value + interest.value);
      let amount = currency(interest.value + amortization.value);
      balance = currency(updated_balance.value - amount.value);
      if (balance.value < 0.1) balance = currency(0);
      installments.push(
        new Installment(
          loan.loan_id,
          installment_number,
          amount.value,
          amortization.value,
          interest.value,
          balance.value
        )
      );
      installment_number++;
    }
    return installments;
  }
}

export class PRICEInstallmentCalculator implements InstallmentCalculator {
  calculate(loan: Loan): Installment[] {
    const installments: Installment[] = [];
    let balance = currency(loan.amount);
    let rate = loan.rate / 100 / 12;
    let installment_number = 1;
    const formula = Math.pow(1 + rate, loan.installments);
    let amount = balance.multiply((formula * rate) / (formula - 1));
    while (balance.value > 0.1) {
      let interest = balance.multiply(rate);
      let amortization = amount.subtract(interest);
      balance = balance.subtract(amortization);
      if (balance.value < 2) balance = currency(0);
      installments.push(
        new Installment(
          loan.loan_id,
          installment_number,
          amount.value,
          amortization.value,
          interest.value,
          balance.value
        )
      );
      installment_number++;
    }
    return installments;
  }
}
