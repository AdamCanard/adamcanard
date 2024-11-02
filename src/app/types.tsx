export interface BeerData {
  collectionId?: string;
  id?: string;
  Beer: string;
  Brewery?: string;
  Rating?: number;
  By?: string;
  Drank: boolean;
  Start?: number;
  End?: number;
  Notes?: string;
}
export interface ISuggestion {
  Beer: string;
  Brewery: string;
  Username?: string;
}

export interface IError {
  email?: { code: string; message: string };
  password?: { code: string; message: string };
  admin?: { code: string; message: string };
}
export interface IPoint {
  top: number;
  left: number;
  width?: string;
  height?: string;
  windowKey?: string;
}
