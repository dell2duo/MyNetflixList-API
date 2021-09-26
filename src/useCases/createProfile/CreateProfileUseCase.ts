import { IProfilesRepository } from "../../repositories/IProfilesRepository";

export class CreateProfileUseCase {
  constructor(private postgresProfileRepository: IProfilesRepository) {}

  async handle(req: Request, res: Response): Promise<Response> {
    return;
  }
}
