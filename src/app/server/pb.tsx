import PocketBase from "pocketbase";
import { BeerData, ISuggestion } from "../types";

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
        username: username,
        password: username,
        passwordConfirm: username,
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
        .authWithPassword(username, username);
      return result;
    } catch (err: unknown) {
      return err;
    }
  }

  async getUsername(record_id: string) {
    try {
      const record = await this.client.collection("users").getOne(record_id);
      return record;
    } catch (err: unknown) {
      return err;
    }
  }

  async isBanned(userId: string) {
    try {
      const resultList = await this.client.collection("Banned").getList(1, 50, {
        sort: "-created",
      });

      for (let i = 0; i < resultList.items.length; i++) {
        if (userId === resultList.items[i].userId) {
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error("Error getting user: ", e);
    }
  }

  async authAsAdminPanel(email: string, password: string) {
    try {
      const result = await this.client.admins.authWithPassword(email, password);
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
  async addSuggestion(data: ISuggestion) {
    try {
      const result = await this.client.collection("Suggestion").create(data);
      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return e;
      }
    }
  }

  async getSuggestion() {
    const BeerList = await this.client.collection("Suggestion").getList(1, 50, {
      sort: "-created",
    });

    return BeerList;
  }

  async deleteBeer(id: string) {
    const result = await this.client.collection("Beer").delete(id);
    return result;
  }

  async addBeer(data: BeerData) {
    const result = await this.client.collection("Beer").create(data);
    return result;
  }

  async getBeer() {
    const BeerList = await this.client.collection("Beer").getList(1, 50, {
      sort: "-created",
    });

    return BeerList;
  }

  async updateBeer(data: BeerData, id: string) {
    const result = await this.client.collection("Beer").update(id, data);
    return result;
  }

  async getById(collection: string, id: string) {
    const record = await this.client.collection(collection).getOne(id, {});
    return record;
  }
}

const db = new DatabaseClient();

export default db;
