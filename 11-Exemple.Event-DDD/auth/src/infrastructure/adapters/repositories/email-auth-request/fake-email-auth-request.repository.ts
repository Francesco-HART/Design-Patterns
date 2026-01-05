import { EmailAuthRequestRepository } from "auth/src/application/ports/repositories/email-auth-request.repository";
import {
  EmailAuthRequestSnapshot,
  EmailAuthRequest,
} from "auth/src/domain/entities/email-auth-request";
import { TransactionableAsync } from "core/src/application/ports/transaction-performer";
import { BaseFakeRepository } from "../base-fake-repository";

export class FakeEmailAuthRequestRepository
  extends BaseFakeRepository
  implements EmailAuthRequestRepository
{
  private requests: Map<string, EmailAuthRequestSnapshot> = new Map();

  save(emailAuthRequest: EmailAuthRequest): TransactionableAsync<void> {
    return async () => {
      this.requests.set(emailAuthRequest.id, emailAuthRequest.snapshot);
      this.saveOutboxEvents(emailAuthRequest.getAndClearEvents());
    };
  }

  async findById(id: string): Promise<EmailAuthRequest | null> {
    const snapshot = this.requests.get(id);
    if (!snapshot) {
      return null;
    }

    return EmailAuthRequest.fromSnapshot(snapshot);
  }

  getAll() {
    return Array.from(this.requests.values()).map(
      EmailAuthRequest.fromSnapshot
    );
  }

  insert(request: EmailAuthRequest) {
    this.requests.set(request.id, request.snapshot);
  }
}
