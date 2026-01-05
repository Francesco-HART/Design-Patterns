import { JwtGenerator } from "../ports/jwt-generator";
import { UserRepository } from "../ports/repositories/user.repository";
import { EmailAuthRequestRepository } from "../ports/repositories/email-auth-request.repository";
import { err, ok, Result } from "neverthrow";
import { User } from "auth/src/domain/entities/user";
import {
  EmailAuthRequestAlreadyUsedError,
  EmailAuthRequestInvalidCodeError,
} from "auth/src/domain/errors/email-auth-requests.errors";
import { TransactionPerformer } from "core/src/application/ports/transaction-performer";
import { Clock } from "core/src/domain/providers/clock/clock";
import { IDGenerator } from "core/src/domain/providers/id-generator/id-generator";
import { EmailAuthRequestNotFoundError } from "../errors/auth-email-request.errors";
import { ICommand, CommandHandler, ICommandHandler } from "@nestjs/cqrs";

type AuthWithEmailProps = {
  requestId: string;
  code: string;
};
export class AuthWithEmailCommand implements ICommand {
  constructor(public readonly props: AuthWithEmailProps) {}
}

export type AuthWithEmailResult = Result<
  { tokens: { access: string; refresh: string } },
  | EmailAuthRequestNotFoundError
  | EmailAuthRequestAlreadyUsedError
  | EmailAuthRequestInvalidCodeError
  | EmailAuthRequestAlreadyUsedError
>;

@CommandHandler(AuthWithEmailCommand)
export class AuthWithEmailHandler
  implements ICommandHandler<AuthWithEmailCommand>
{
  constructor(
    private readonly emailAuthRequestRepository: EmailAuthRequestRepository,
    private readonly userRepository: UserRepository,
    private readonly clock: Clock,
    private readonly idGenerator: IDGenerator,
    private readonly jwtGenerator: JwtGenerator,
    private readonly transactionPerformer: TransactionPerformer
  ) {}

  async execute(command: AuthWithEmailCommand): Promise<AuthWithEmailResult> {
    return this.transactionPerformer.perform(async (trx) => {
      const { requestId, code } = command.props;

      const request = await this.emailAuthRequestRepository.findById(requestId);

      if (!request) {
        return err(new EmailAuthRequestNotFoundError());
      }

      const result = request.verify(code, this.clock.now());

      if (result.isErr()) {
        return result;
      }

      let user = await this.userRepository.findByEmail(request.email);

      if (!user) {
        user = User.create({
          id: this.idGenerator.generate(),
          email: request.email,
          currentDate: this.clock.now(),
        });
        await this.userRepository.save(user)(trx);
      }

      await this.emailAuthRequestRepository.save(request)(trx);

      return ok({
        tokens: {
          access: this.jwtGenerator.generateAccess(user.id),
          refresh: this.jwtGenerator.generateRefresh(user.id),
        },
      });
    });
  }
}
