import { ApplyForLoan } from "./apply-for-loan";
import { GetLoan } from "./get-loan";
import { MortgageLoanfactory } from "./loan-factory";
import { RepositoryMemoryFactory } from "./repository-factory";

test("should request a mortgage loan", async () => {
  const repository_factory = new RepositoryMemoryFactory();
  const mortgage_loan_factory = new MortgageLoanfactory();
  const apply_for_loan = new ApplyForLoan(
    repository_factory,
    mortgage_loan_factory
  );
  const input = {
    amount: 100_000,
    income: 10_000,
    installments: 240,
  };

  const output_apply_for_loan = await apply_for_loan.execute(input);
  const get_loan = new GetLoan(repository_factory);
  const output_get_loan = await get_loan.execute(output_apply_for_loan);
  expect(output_get_loan.amount).toBe(100_000);
  expect(output_get_loan.income).toBe(10_000);
  expect(output_get_loan.installments).toHaveLength(240);
  expect(output_get_loan.installments.at(0)?.number).toBe(1);
  expect(output_get_loan.installments.at(0)?.amount).toBe(1250);
  expect(output_get_loan.installments.at(0)?.amortization).toBe(416.67);
  expect(output_get_loan.installments.at(0)?.interest).toBe(833.33);
  expect(output_get_loan.installments.at(0)?.balance).toBe(99_583.33);
  expect(output_get_loan.installments.at(239)?.number).toBe(240);
  expect(output_get_loan.installments.at(239)?.amount).toBe(420.14);
  expect(output_get_loan.installments.at(239)?.amortization).toBe(416.67);
  expect(output_get_loan.installments.at(239)?.interest).toBe(3.47);
  expect(output_get_loan.installments.at(239)?.balance).toBe(0);
});
