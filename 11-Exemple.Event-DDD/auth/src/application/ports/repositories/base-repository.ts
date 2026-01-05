import { TransactionableAsync } from "core/src/application/ports/transaction-performer";
import { BaseEntity } from "core/src/domain/entities/base-entity";

export abstract class BaseRepository<T extends BaseEntity> {
  abstract save(entity: T): TransactionableAsync<void>;
}
