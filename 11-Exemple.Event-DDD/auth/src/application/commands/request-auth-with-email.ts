import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { EmailAuthRequestRepository } from "../ports/repositories/email-auth-request.repository";
import { ok, Result } from "neverthrow";
import { EmailAuthRequest } from "auth/src/domain/entities/email-auth-request";
import { OTPGenerator } from "auth/src/domain/providers/otp-generator";
import { TransactionPerformer } from "core/src/application/ports/transaction-performer";
import { Clock } from "core/src/domain/providers/clock/clock";
import { IDGenerator } from "core/src/domain/providers/id-generator/id-generator";

type RequestAuthWithEmailProps = {
  email: string;
};

export class RequestAuthWithEmailCommand implements ICommand {
  constructor(public readonly props: RequestAuthWithEmailProps) {}
}

export type RequestAuthWithEmailResult = Result<{ id: string }, never>;

@CommandHandler(RequestAuthWithEmailCommand)
export class RequestAuthWithEmailHandler
  implements ICommandHandler<RequestAuthWithEmailCommand>
{
  constructor(
    private clock: Clock,
    private idGenerator: IDGenerator,
    private otpGenerator: OTPGenerator,
    private emailAuthRequestRepository: EmailAuthRequestRepository,
    private transactionPerformer: TransactionPerformer
  ) {}

  execute(command: RequestAuthWithEmailCommand) {
    return this.transactionPerformer.perform(async (trx) => {
      const { email } = command.props;

      const request = EmailAuthRequest.create({
        id: this.idGenerator.generate(),
        email,
        code: this.otpGenerator.generate(),
        currentDate: this.clock.now(),
      });

      await this.emailAuthRequestRepository.save(request)(trx);

      return ok({
        id: request.id,
      });
    });
  }
}
