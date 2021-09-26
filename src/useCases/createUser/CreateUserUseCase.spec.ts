import { PostgresUserRepository } from "../../repositories/implementations/User/PostgresUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("create user", () => {
  it("trying to create user", async () => {
    const userInfo = {
      name: "Uncle Bob",
      email: "uncle@test.com",
      password: "1234567890",
      birthDate: "01-09-1998",
    };

    const insertUser = async (user: ICreateUserRequestDTO) =>
      await createUser.execute(user);

    const pgMock = new PostgresUserRepository();

    const createUser = new CreateUserUseCase(pgMock);

    await insertUser(userInfo);

    await expect(pgMock.getAllUsers()).resolves.toHaveLength(1);
  });

  it("trying to create equal users", async () => {
    const userInfo = {
      name: "Uncle Bob",
      email: "uncle@test.com",
      password: "1234567890",
      birthDate: "01-09-1998",
    };

    const insertUser = async (user: ICreateUserRequestDTO) =>
      await createUser.execute(user);

    const pgMock = new PostgresUserRepository();

    const createUser = new CreateUserUseCase(pgMock);

    await insertUser(userInfo);

    await expect(insertUser(userInfo)).rejects.toEqual(
      Error("User already exists")
    );
  });

  it("trying to create user with empty fields", async () => {
    const userInfo = {
      name: "",
      email: "",
      password: "",
      birthDate: "",
    };

    const insertUser = async (user: ICreateUserRequestDTO) =>
      await createUser.execute(user);

    const pgMock = new PostgresUserRepository();

    const createUser = new CreateUserUseCase(pgMock);

    await expect(insertUser(userInfo)).rejects.toEqual(Error("Invalid fields"));
  });
});
