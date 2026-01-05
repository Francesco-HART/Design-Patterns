import { Emailer, SendAuthOTPProps } from "auth/src/application/ports/emailer";

export class FakeEmailer extends Emailer {
  lastAuthOTPSend: SendAuthOTPProps | null = null;
  async sendAuthOTP(props: SendAuthOTPProps): Promise<void> {
    this.lastAuthOTPSend = props;
  }
}
