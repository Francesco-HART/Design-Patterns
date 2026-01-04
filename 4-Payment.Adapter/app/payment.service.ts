import { StripePayment, PaypalPayment } from "./payment-methode/payment";

export class PaymentService {
  pay(amount: number, provider: "stripe" | "paypal"): void {
    if (provider === "stripe") {
      const stripe = new StripePayment();
      stripe.makePayment(amount * 100);
    }

    if (provider === "paypal") {
      const paypal = new PaypalPayment();
      paypal.sendPayment(amount, "EUR");
    }
  }
}
