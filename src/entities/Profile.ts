import { v4 } from "uuid";

export class Profile {
  public readonly id: string;
  public readonly user_id: string;

  public name: string;
  public birthDate: string;

  constructor(props: Omit<Profile, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
