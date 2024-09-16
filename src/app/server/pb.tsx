import PocketBase from "pocketbase";
import { BeerData, ISuggestion } from "../types";

export const POCKET_BASE_URL = "http://127.0.0.1:8090";

export class DatabaseClient {
  client: PocketBase;

  constructor() {
    // instantiate PocketBase
    this.client = new PocketBase(POCKET_BASE_URL);
    this.client.autoCancellation(false);
  }

  async register(email: string, password: string) {
    try {
      const result = await this.client.collection("users").create({
        email,
        password,
        passwordConfirm: password,
      });
      return result;
    } catch (err: unknown) {
      return err;
    }
  }

  async authenticate(email: string, password: string) {
    try {
      const result = await this.client
        .collection("users")
        .authWithPassword(email, password);
      // If there is no token in the result, it means something went wrong
      // console.log(this.client.authStore.isValid);
      // console.log(this.client.authStore.token);

      return result;
    } catch (err: unknown) {
      return err;
    }
  }

  async getUserFromId(userId: string) {
    try {
      const result = await this.client
        .collection("users")
        .getOne(`userId="${userId}"`);
      console.log(result);
    } catch (e) {
      console.error("Error getting user: ", e);
    }
  }

  // async authAsClient() {
  //   const authData = await this.client
  //     .collection("users")
  //     .authWithOAuth2({ provider: "google" });

  //   return authData;
  // }

  // async authMethods() {
  //   const authMethods = await this.client
  //     .collection("users")
  //     .listAuthMethods()
  //     .then((methods) => methods)
  //     .catch((err) => {
  //       console.error(err);
  //     });
  //   return authMethods;
  // }

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

  async addSuggestion(data: ISuggestion) {
    await this.authAsAdmin();
    const result = await this.client.collection("Suggestion").create(data);
    return result;
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

  // async addDrank(data: { Beer: string; Brewery: string; Rating: number }) {
  //   await this.authAsAdmin();
  //   const result = await this.client.collection("Drank").create(data);
  // }

  // async addDrink(data: { Beer: string; Brewery: string; By: string }) {
  //   await this.authAsAdmin();
  //   const result = await this.client.collection("Drink").create(data);
  // }

  // async getDrank() {
  //   await this.authAsAdmin();
  //   const DrankList = await this.client.collection("Drank").getList(1, 50, {
  //     sort: "-created",
  //   });
  //   return DrankList;
  // }

  // async getDrink() {
  //   await this.authAsAdmin();
  //   const DrankList = await this.client.collection("Drink").getList(1, 50, {
  //     sort: "-created",
  //   });
  //   return DrankList;
  // }

  async getById(collection: string, id: string) {
    await this.authAsAdmin();
    const record = await this.client.collection(collection).getOne(id, {});
    return record;
  }
}

const db = new DatabaseClient();

export default db;
