export class Installment {
  constructor(
    readonly loan_id: string,
    readonly number: number,
    readonly amount: number,
    readonly amortization: number,
    readonly interest: number,
    readonly balance: number
  ) {}
}
