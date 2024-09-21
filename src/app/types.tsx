export interface BeerData {
  collectionId?: string;
  id?: string;
  Beer: string;
  Brewery?: string;
  Rating?: number;
  By?: string;
  Drank: boolean;
}

export interface ISuggestion {
  Beer: string;
  Brewery: string;
  Name: string;
  userId?: string;
}

export interface IError {
  email?: { code: string; message: string };
  password?: { code: string; message: string };
  admin?: { code: string; message: string };
}
