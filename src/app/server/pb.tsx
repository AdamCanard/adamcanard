import PocketBase from "pocketbase";
import { BeerData, ISuggestion } from "../types";

export const POCKET_BASE_URL = "http://127.0.0.1:8090";

export class DatabaseClient {
  client: PocketBase;

  constructor() {
    // instantiate PocketBase
    this.client = new PocketBase(process.env.PB_DOMAIN);
    this.client.autoCancellation(false);
  }

  async register(username: string, email: string, password: string) {
    try {
      const result = await this.client.collection("users").create({
        username,
        email,
        password,
        passwordConfirm: password,
      });
      return result;
    } catch (err: unknown) {
      console.log(err);
      return err;
    }
  }

  async authenticate(email: string, password: string) {
    try {
      const result = await this.client
        .collection("users")
        .authWithPassword(email, password);
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

  async authAsAdmin() {
    if (process.env.PB_ADMIN_EMAIL && process.env.PB_ADMIN_PASS) {
      try {
        const result = await this.client.admins.authWithPassword(
          process.env.PB_ADMIN_EMAIL,
          process.env.PB_ADMIN_PASS
        );
        return result;
      } catch (e) {
        console.error("Error authenticating as admin: ", e);
      }
    }
  }

  async deleteBeer(id: string) {
    try {
      const result = await this.client.collection("Beer").delete(id);
      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return e;
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
    await this.authAsAdmin();
    const SuggestionList = await this.client
      .collection("Suggestion")
      .getList(1, 50, {
        sort: "-created",
      });

    return SuggestionList;
  }

  async addBeer(data: BeerData) {
    await this.authAsAdmin();
    const result = await this.client.collection("Beer").create(data);
    return result;
  }

  async getBeer() {
    await this.authAsAdmin();
    const BeerList = await this.client.collection("Beer").getList(1, 50, {
      sort: "-created",
    });

    return BeerList;
  }

  async updateBeer(data: BeerData, id: string) {
    await this.authAsAdmin();
    const result = await this.client.collection("Beer").update(id, data);
    return result;
  }

  async getById(collection: string, id: string) {
    await this.authAsAdmin();
    const record = await this.client.collection(collection).getOne(id, {});
    return record;
  }
}

const db = new DatabaseClient();

export default db;
