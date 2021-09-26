import { Profile } from "../../../entities/Profile";
import { User } from "../../../entities/User";
import { PostgresUserRepository } from "../User/PostgresUserRepository";
import { PostgresProfileRepository } from "./PostgresProfileRepository";

describe("Testing PostgresProfileRepository", () => {
  const user: User = {
    id: Math.random().toString(),
    name: "Uncle Bob",
    email: "uncle@test.com",
    password: "1234567890",
    birthDate: "01-09-1998",
  };

  beforeAll(async () => {
    const repo = new PostgresUserRepository();
    await repo.save(user);
  });

  it("insert new profile into repository", async () => {
    const repo = new PostgresProfileRepository();
    const newProfile: Profile = {
      id: Math.random().toString(),
      user_id: user.id,
      name: "Main Profile",
      birthDate: "01-09-1998",
    };

    repo.save(newProfile);
    const profiles = await repo.fromUser(user.id);

    expect(profiles).toContain(newProfile);
  });
});
