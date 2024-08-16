import { CarLoan, MortgageLoan } from "./loan";

test("Should create a mortgage loan", () => {
  const loan = MortgageLoan.create(100_000, 10_000, 240);
  expect(loan.loan_id).toBeDefined();
  expect(loan.amount).toBe(100_000);
  expect(loan.income).toBe(10_000);
  expect(loan.installments).toBe(240);
});

test("Shouldn't create a mortgage loan with a number of installments greater than 420", () => {
  expect(() => MortgageLoan.create(100_000, 10_000, 450)).toThrow(
    new Error("The maximum number of installments for mortgage loan is 420")
  );
});

test("Shouldn't create a mortgage loan if the installment amount exceed 25% of income", () => {
  expect(() => MortgageLoan.create(200_000, 1000, 420)).toThrow(
    new Error("The installment amount couldn't exceed 25% of income")
  );
});

test("Shouldn't create a car loan with a number of installments greater than 60", () => {
  expect(() => CarLoan.create(100_000, 10_000, 72)).toThrow(
    new Error("The maximum number of installments for car loan is 60")
  );
});

test("Shouldn't create a mortgage loan if the installment amount exceed 30% of income", () => {
  expect(() => CarLoan.create(200_000, 1000, 60)).toThrow(
    new Error("The installment amount couldn't exceed 30% of income")
  );
});
