export class Ok<T, E> {
  constructor(public value: T) {}

  static of<T, E>(value: T): Ok<T, E> {
    return new Ok<T, E>(value);
  }

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }
}

export class Err<T, E> {
  constructor(public error: E) {}

  static of<T, E>(error: E): Err<T, E> {
    return new Err<T, E>(error);
  }

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }
}

export type Result<T, E> = Ok<T, E> | Err<T, E>;

// Exemple d'utilisation
class EditMessageUseCase {
  execute(messageId: string, newText: string): Result<string, string> {
    if (newText.length === 0) {
      return Err.of<string, string>("Message text cannot be empty");
    }
    if (newText.length > 280) {
      return Err.of<string, string>("Message text exceeds maximum length");
    }
    // Supposons que la mise à jour du message réussit
    return Ok.of<string, string>(messageId);
  }
}
