import { Profile } from "../entities/Profile";
import { User } from "../entities/User";

export interface IProfilesRepository {
  save(profile: Profile): Promise<void>;
  fromUser(id: string): Promise<Profile[]>;
}
