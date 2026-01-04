import { StripePayment } from "./payment-methode/payment";
import { StripeAdapter } from "./payment.processor";
import { PaymentService } from "./payment.service";

function main() {
  // Choix du provider
  const stripe = new StripePayment();
  const stripeAdapter = new StripeAdapter(stripe);

  const paymentService = new PaymentService(stripeAdapter);
  paymentService.pay(42);

  console.log("Payment Adapter Example");
}
main();
