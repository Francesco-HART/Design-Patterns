import { PaypalPayment, StripePayment } from "./payment-methode/payment";

// payment-processor.ts
export interface PaymentProcessor {
  pay(amount: number): void;
}

// stripe-adapter.ts

export class StripeAdapter implements PaymentProcessor {
  constructor(private stripe: StripePayment) {}

  pay(amount: number): void {
    const cents = amount * 100; // 🔁 adaptation technique
    this.stripe.makePayment(cents);
  }
}

// paypal-adapter.ts

export class PaypalAdapter implements PaymentProcessor {
  constructor(private paypal: PaypalPayment) {}

  pay(amount: number): void {
    this.paypal.sendPayment(amount, "EUR");
  }
}

// fake-payment-adapter.ts Utilisé pour les tests
export class FakePaymentAdapter implements PaymentProcessor {
  pay(amount: number): void {
    console.log(`Fake payment of ${amount}`);
  }
}
