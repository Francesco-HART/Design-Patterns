import { TransactionableAsync } from "core/src/application/ports/transaction-performer";
import { AggregateRoot } from "core/src/domain/entities/aggregate-root";
import { Knex } from "knex";

export class BaseKnexRepository {
  constructor(
    protected knex: Knex,
    protected schema: string
  ) {}

  protected saveEvents(entity: AggregateRoot): TransactionableAsync<void> {
    // @ts-ignore
    return async (trx: Knex.Transaction) => {
      const events = entity.getAndClearEvents().map((event) => ({
        name: event.name,
        payload: event.payload,
      }));

      if (!events.length) {
        return;
      }

      await this.knex
        .withSchema(this.schema)
        .transacting(trx)
        .insert(events)
        .into("outbox_events");
    };
  }

  protected saveManyEvents(
    entities: AggregateRoot[]
  ): TransactionableAsync<void> {
    // @ts-ignore
    return async (trx: Knex.Transaction) => {
      const events = entities
        .map((entity) => entity.getAndClearEvents())
        .flat()
        .map((event) => ({
          name: event.name,
          payload: event.payload,
        }));

      if (!events.length) {
        return;
      }

      await this.knex
        .withSchema(this.schema)
        .transacting(trx)
        .insert(events)
        .into("outbox_events");
    };
  }
}
