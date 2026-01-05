import { Inject, Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { BaseKnexRepository } from "../base-knex-repository";
import { EmailAuthRequestRepository } from "auth/src/application/ports/repositories/email-auth-request.repository";
import { EmailAuthRequest } from "auth/src/domain/entities/email-auth-request";
import { TransactionableAsync } from "core/src/application/ports/transaction-performer";
import { EmailAuthRequestPm } from "core/src/infrastructure/database-configuration/persistent-models/auth/email-auth-request.pm";

@Injectable()
export class KnexEmailAuthRequestRepository
  extends BaseKnexRepository
  implements EmailAuthRequestRepository
{
  // @ts-ignore
  constructor(@Inject("Knex") knex: Knex) {
    super(knex, "auth");
  }
  save(entity: EmailAuthRequest): TransactionableAsync<void> {
    // @ts-ignore
    return async (trx: Knex.Transaction) => {
      const { id, email, code, expiresAt, isUsed } = entity.snapshot;
      await this.knex("email_auth_requests")
        .withSchema(this.schema)
        .transacting(trx)
        .insert({
          id,
          email,
          code,
          expires_at: expiresAt,
          is_used: isUsed,
        })
        .onConflict("id")
        .merge();

      await this.saveEvents(entity)(trx);
    };
  }

  async findById(id: string): Promise<EmailAuthRequest | null> {
    const entity = await this.knex
      .withSchema(this.schema)
      .select<EmailAuthRequestPm>()
      .from("email_auth_requests")
      .where("id", id)
      .first();
    if (!entity) {
      return null;
    }

    return EmailAuthRequest.fromSnapshot({
      id: entity.id,
      email: entity.email,
      code: entity.code,
      expiresAt: new Date(entity.expires_at),
      isUsed: entity.is_used,
    });
  }
}
