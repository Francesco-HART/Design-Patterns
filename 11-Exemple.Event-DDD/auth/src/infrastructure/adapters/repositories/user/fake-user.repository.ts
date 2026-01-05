import { UserRepository } from "auth/src/application/ports/repositories/user.repository";
import { BaseFakeRepository } from "../base-fake-repository";
import { UserSnapshot, User } from "auth/src/domain/entities/user";
import { TransactionableAsync } from "core/src/application/ports/transaction-performer";

export class FakeUserRepository
  extends BaseFakeRepository
  implements UserRepository
{
  private users: Map<string, UserSnapshot> = new Map();

  async findById(id: string): Promise<User | null> {
    const snapshot = this.users.get(id);
    if (!snapshot) {
      return Promise.resolve(null);
    }

    return User.fromSnapshot(snapshot);
  }

  save(entity: User): TransactionableAsync<void> {
    return async () => {
      this.users.set(entity.id, entity.snapshot);
      this.saveOutboxEvents(entity.getAndClearEvents());
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = Array.from(this.users.values()).find(
      (u) => u.email === email
    );

    if (!snapshot) {
      return null;
    }

    return User.fromSnapshot(snapshot);
  }

  insert(user: User) {
    this.users.set(user.id, user.snapshot);
  }

  getAll() {
    return Array.from(this.users.values()).map(User.fromSnapshot);
  }
}
