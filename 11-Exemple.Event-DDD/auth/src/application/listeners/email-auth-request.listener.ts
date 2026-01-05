import { Injectable } from "@nestjs/common";
import { SendEmailAuthCodeCommand } from "../commands/send-email-auth-code";
import { CommandBus } from "@nestjs/cqrs";
import { EmailAuthRequestCreatedEvent } from "auth/src/domain/events/email-auth-request.events";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class EmailAuthRequestListener {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent("email-auth-request.created")
  onEmailAuthRequestCreated(payload: EmailAuthRequestCreatedEvent) {
    this.commandBus.execute(
      new SendEmailAuthCodeCommand({
        email: payload.email,
        code: payload.code,
      })
    );
  }
}
