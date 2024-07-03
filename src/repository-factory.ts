import {
  InstallmentRepository,
  InstallmentRepositoryMemory,
} from "./installment-repository";
import { LoanRepository, LoanRepositoryMemory } from "./loan-repository";

export interface RepositoryFactory {
  createLoanRepository(): LoanRepository;
  createInstallmentRepository(): InstallmentRepository;
}

export class RepositoryMemoryFactory implements RepositoryFactory {
  createLoanRepository(): LoanRepository {
    return LoanRepositoryMemory.getInstance();
  }
  createInstallmentRepository(): InstallmentRepository {
    return InstallmentRepositoryMemory.getInstance();
  }
}
