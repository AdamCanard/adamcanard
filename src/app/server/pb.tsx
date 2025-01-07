import PocketBase from "pocketbase";

export const POCKET_BASE_URL = "http://127.0.0.1:8090";
export const domain = process.env.PB_DOMAIN;

if (!domain) {
  throw new Error(
    "PB_DOMAIN Environment Variable is currently undefined! Check .env file, or if thrown in Docker Runtime verify that compose environment variables are set correctly!",
    {
      cause:
        "const domain (process.env.PB_DOMAIN) is undefined in src/app/server/pb.tsx",
    },
  );
}

export class DatabaseClient {
  client: PocketBase;

  constructor() {
    // instantiate PocketBase
    this.client = new PocketBase(domain);
    this.client.autoCancellation(false);
  }
  async register(username: string) {
    try {
      const result = await this.client.collection("users").create({
        email: username + "@adamcanard.ca",
        username: username,
        password: username,
        passwordConfirm: username,
        name: username,
      });
      return result;
    } catch (err: unknown) {
      console.log(err);
      return err;
    }
  }

  async authenticate(username: string) {
    try {
      const result = await this.client
        .collection("users")
        .authWithPassword(username + "@adamcanard.ca", username);
      return result;
    } catch (err: unknown) {
      return err;
    }
  }

  async getUsername(user_id: string) {
    try {
      const record = await this.client.collection("users").getOne(user_id);
      record.Logs += 1;
      return record;
    } catch (err: unknown) {
      return err;
    }
  }

  async authAsAdminPanel(email: string, password: string) {
    try {
      const result = await this.client
        .collection("_superusers")
        .authWithPassword(email, password);
      return result;
    } catch (e) {
      console.error("Error authenticating as admin: ", e);
    }
  }

  async authAsAdmin(email: string, password: string) {
    if (process.env.PB_ADMIN_EMAIL && process.env.PB_ADMIN_PASS) {
      try {
        const result = await this.client.admins.authWithPassword(
          process.env.PB_ADMIN_EMAIL,
          process.env.PB_ADMIN_PASS,
        );
        return result;
      } catch (e) {
        console.error("Error authenticating as admin: ", e);
      }
    } else {
      try {
        const result = await this.client.admins.authWithPassword(
          email,
          password,
        );
        return result;
      } catch (e) {
        console.error("Error authenticating as admin: ", e);
      }
    }
  }
  async addValue(data: object, collection: string) {
    const result = await this.client.collection(collection).create(data);
    return result;
  }

  async getList(collection: string) {
    const List = await this.client.collection(collection).getFullList();
    return List;
  }

  async delete(collection: string, id: string) {
    const result = await this.client.collection(collection).delete(id);
    return result;
  }

  async update(collection: string, id: string, data: object) {
    const result = await this.client.collection(collection).update(id, data);
    return result;
  }

  async getById(collection: string, id: string) {
    const record = await this.client.collection(collection).getOne(id, {});
    return record;
  }
}

const db = new DatabaseClient();

export default db;
