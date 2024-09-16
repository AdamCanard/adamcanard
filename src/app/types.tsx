export interface BeerData {
  collectionId?: string;
  id?: string;
  Beer: string;
  Brewery?: string;
  Rating?: number;
  By?: string;
  Image?: any;
  Drank: boolean;
}

export interface ISuggestion {
  Beer: string;
  Brewery: string;
  Name: string;
}

export interface IError {
  email?: { code: string; message: string };
  password?: { code: string; message: string };
}
