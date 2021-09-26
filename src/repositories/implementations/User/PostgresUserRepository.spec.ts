import { User } from "../../../entities/User";
import { PostgresUserRepository } from "./PostgresUserRepository";

describe("Testing PostgresUserRepository", () => {
  it("insert user into repository", async () => {
    const repo = new PostgresUserRepository();
    const user: User = {
      id: Math.random().toString(),
      name: "Uncle Bob",
      email: "uncle@test.com",
      password: "1234567890",
      birthDate: "01-09-1998",
    };

    await repo.save(user);
    const foundUser = await repo.findByEmail(user.email);

    expect(foundUser).toMatchObject(user);
  });
});
