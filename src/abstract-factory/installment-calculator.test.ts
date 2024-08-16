import {
  PRICEInstallmentCalculator,
  SACInstallmentCalculator,
} from "./installment-calculator";
import { MortgageLoan } from "./loan";

test("Should calculate the installments with SAC", () => {
  const installment_calculator = new SACInstallmentCalculator();
  const loan = MortgageLoan.create(100_000, 10_000, 240);
  const installments = installment_calculator.calculate(loan);
  expect(installments).toHaveLength(240);

  expect(installments.at(0)?.number).toBe(1);
  expect(installments.at(0)?.amount).toBe(1250);
  expect(installments.at(0)?.amortization).toBe(416.67);
  expect(installments.at(0)?.interest).toBe(833.33);
  expect(installments.at(0)?.balance).toBe(99_583.33);

  expect(installments.at(239)?.number).toBe(240);
  expect(installments.at(239)?.amount).toBe(420.14);
  expect(installments.at(239)?.amortization).toBe(416.67);
  expect(installments.at(239)?.interest).toBe(3.47);
  expect(installments.at(239)?.balance).toBe(0);
});

test("Should calculate the installments with PRICE", () => {
  const installment_calculator = new PRICEInstallmentCalculator();
  const loan = MortgageLoan.create(100_000, 10_000, 240);
  const installments = installment_calculator.calculate(loan);
  expect(installments).toHaveLength(240);

  expect(installments.at(0)?.number).toBe(1);
  expect(installments.at(0)?.amount).toBe(965.02);
  expect(installments.at(0)?.amortization).toBe(131.69);
  expect(installments.at(0)?.interest).toBe(833.33);
  expect(installments.at(0)?.balance).toBe(99_868.31);

  expect(installments.at(239)?.number).toBe(240);
  expect(installments.at(239)?.amount).toBe(965.02);
  expect(installments.at(239)?.amortization).toBe(957.03);
  expect(installments.at(239)?.interest).toBe(7.99);
  expect(installments.at(239)?.balance).toBe(0);
});
