// payment-service.ts

import { PaymentProcessor } from "./payment.processor";

export class PaymentService {
  constructor(private paymentProcessor: PaymentProcessor) {}

  pay(amount: number): void {
    this.paymentProcessor.pay(amount);
  }
}
