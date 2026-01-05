import { ApplicationError } from "core/src/application/errors/application-error";

export class EmailAuthRequestNotFoundError extends ApplicationError {
  constructor() {
    super("REQUEST_NOT_FOUND");
  }
}
