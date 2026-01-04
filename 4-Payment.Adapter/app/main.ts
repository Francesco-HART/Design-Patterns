import { PaymentService } from "./payment.service";

function main() {
  console.log("Payment Adapter Example");

  const service = new PaymentService();
  service.pay(50, "stripe");
  service.pay(50, "paypal");
}
main();
