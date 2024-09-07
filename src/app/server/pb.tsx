import PocketBase from "pocketbase";
import { BeerData } from "../types";

export const POCKET_BASE_URL = "http://127.0.0.1:8090";

export class DatabaseClient {
  client: PocketBase;

  constructor() {
    // instantiate PocketBase
    this.client = new PocketBase(POCKET_BASE_URL);
    this.client.autoCancellation(false);
  }

  async authAsAdmin() {
    if (process.env.PB_ADMIN_EMAIL && process.env.PB_ADMIN_PASS) {
      try {
        const result = await this.client.admins.authWithPassword(
          process.env.PB_ADMIN_EMAIL,
          process.env.PB_ADMIN_PASS
        );
      } catch (e) {
        console.error("Error authenticating as admin: ", e);
      }
    }
  }

  async addBeer(data: BeerData) {
    await this.authAsAdmin();
    const result = await this.client.collection("Beer").create(data);
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
    const record = await this.client.collection("Beer").update(id, data);
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
