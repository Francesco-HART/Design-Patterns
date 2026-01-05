import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { JwtGenerator } from "auth/src/application/ports/jwt-generator";
import { err, ok, Result } from "neverthrow";

@Injectable()
export class NestJwtGenerator implements JwtGenerator {
  constructor(private readonly jwtService: JwtService) {}

  refresh(token: string): Result<string, Error> {
    try {
      const { id } = this.jwtService.verify(token) as { id: string };
      return ok(this.generateAccess(id));
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }

  generateAccess(id: string): string {
    return this.jwtService.sign(
      { id },
      {
        expiresIn: "1h",
      }
    );
  }
  generateRefresh(id: string): string {
    return this.jwtService.sign(
      { id },
      {
        expiresIn: "30d",
      }
    );
  }
}
