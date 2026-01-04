import { createFollowingFixture, FollowingFixture } from "./following.fixture";
import { describe, expect, test, beforeEach } from "vitest";

describe("Feature: Following a user", () => {
  let fixture: FollowingFixture;

  beforeEach(() => {
    fixture = createFollowingFixture();
  });
  test("Alice can follow Bob", async () => {
    fixture.givenUserFollowees({
      user: "Alice",
      followees: ["Charlie"],
    });

    await fixture.whenUserFollows({
      user: "Alice",
      userToFollow: "Bob",
    });

    await fixture.thenUserFolloweesAre({
      user: "Alice",
      followees: ["Charlie", "Bob"],
    });
  });
});
