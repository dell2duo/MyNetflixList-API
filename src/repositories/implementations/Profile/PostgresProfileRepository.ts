import { Profile } from "../../../entities/Profile";
import { IProfilesRepository } from "../../IProfilesRepository";

export class PostgresProfileRepository implements IProfilesRepository {
  private profiles: Profile[] = [];

  async save(profile: Profile): Promise<void> {
    this.profiles.push(profile);
  }

  async fromUser(id: string): Promise<Profile[]> {
    return this.profiles.map((profile) => {
      if (profile.user_id === id) return profile;
    });
  }
}
