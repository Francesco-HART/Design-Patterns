import { ApplicationError } from "core/src/application/errors/application-error";

export class UserNotFoundError extends ApplicationError {
  constructor() {
    super("USER_NOT_FOUND");
  }
}
