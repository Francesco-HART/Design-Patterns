// stripe-payment.ts
export class StripePayment {
  makePayment(cents: number): void {
    console.log(`Stripe payment of ${cents} cents`);
  }
}

// paypal-payment.ts
export class PaypalPayment {
  sendPayment(amount: number, currency: string): void {
    console.log(`Paypal payment of ${amount} ${currency}`);
  }
}
