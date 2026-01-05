import { DomainEvent } from "core/src/domain/entities/base-entity";

export class BaseFakeRepository {
  private outboxEvents: DomainEvent[] = [];

  protected saveOutboxEvents(events: DomainEvent[]) {
    this.outboxEvents.push(...events);
  }

  getOutboxEvents() {
    return this.outboxEvents;
  }
}
