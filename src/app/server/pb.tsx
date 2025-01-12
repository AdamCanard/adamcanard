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
  async addValue(data: FormData, collection: string) {
    const it = data.keys();
    const uniqueKey = it.next().value;
    const unqiueData = data.get(uniqueKey);
    data.append("_" + uniqueKey, unqiueData as string);
    console.log(data);
    const result = await this.client.collection(collection).create(data);
    return result;
  }

  async getList(collection: string) {
    const list = await this.client.collection(collection).getFullList();
    const fixedForm = formFixer(list);
    const fixedList = listFixer(list, fixedForm);
    return fixedList;
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

const formFixer = (list: object[]) => {
  const form = Object.keys(list[0]);
  const newForm: string[] = [];
  let uniqueIndex: number = 0;
  for (let i = 0; i < form.length; i++) {
    if (form[i].charAt(0) === "_") {
      newForm[0] = form[i].slice(1);
      uniqueIndex = i;
    }
  }
  for (let i = 0; i < form.length; i++) {
    if (uniqueIndex !== i) {
      newForm.push(form[i]);
    }
  }
  return newForm;
};

const listFixer = (list: object[], form: string[]) => {
  const newList: object[] = [];
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const newElement = {};
    const unique = "_" + form[0];
    const uniqueCorrect = form[0];
    for (let j = 0; j < Object.values(element).length; j++) {
      const objectKey = form[j];
      newElement[objectKey as keyof object] =
        element[objectKey as keyof object];
    }
    newElement[uniqueCorrect as keyof object] = element[unique as keyof object];
    newList.push(newElement);
  }
  return newList;
};
