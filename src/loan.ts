import { randomUUID } from "node:crypto";

export abstract class Loan {
  abstract rate: number;

  constructor(
    readonly loan_id: string,
    readonly amount: number,
    readonly income: number,
    readonly installments: number,
    readonly type: string
  ) {}

  static create(amount: number, income: number, installments: number) {
    throw new Error("This method is abstract");
  }
}

export class MortgageLoan extends Loan {
  rate = 10;

  constructor(
    loan_id: string,
    amount: number,
    income: number,
    installments: number
  ) {
    super(loan_id, amount, income, installments, "mortgage");
    if (installments > 420)
      throw new Error(
        "The maximum number of installments for mortgage loan is 420"
      );

    if (income * 0.25 < amount / installments)
      throw new Error("The installment amount couldn't exceed 25% of income");
  }

  static create(amount: number, income: number, installments: number) {
    const loan_id = randomUUID();
    return new MortgageLoan(loan_id, amount, income, installments);
  }
}

export class CarLoan extends Loan {
  rate = 15;

  constructor(
    loan_id: string,
    amount: number,
    income: number,
    installments: number
  ) {
    super(loan_id, amount, income, installments, "mortgage");
    if (installments > 60)
      throw new Error("The maximum number of installments for car loan is 60");

    if (income * 0.3 < amount / installments)
      throw new Error("The installment amount couldn't exceed 30% of income");
  }

  static create(amount: number, income: number, installments: number) {
    const loan_id = randomUUID();
    return new CarLoan(loan_id, amount, income, installments);
  }
}
