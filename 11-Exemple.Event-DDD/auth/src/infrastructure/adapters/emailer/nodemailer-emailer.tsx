import { render } from "@react-email/components";
import { Emailer, SendAuthOTPProps } from "auth/src/application/ports/emailer";

import * as nodemailer from "nodemailer";
export class NodeMailerEmailer implements Emailer {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly config: { email: string; password: string }) {
    this.transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: config.email,
        pass: config.password,
      },
    });
  }

  async sendAuthOTP({ email, code }: SendAuthOTPProps): Promise<void> {
    await this.transporter.sendMail({
      from: `Flagster <${this.config.email}>`,
      to: email,
      subject: `${code} - Flagster OTP`,

      // @ts-ignore
      html: await render(<AuthEmailOTP code={code} />),
    });
  }
}
