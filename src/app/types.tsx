export interface BeerData {
  collectionId?: string;
  id?: string;
  Beer: string;
  Brewery?: string;
  Rating?: number;
  By?: string;
  Start?: number;
  End?: number;
  Notes?: string;
}
export interface ISuggestion {
  Beer: string;
  Brewery: string;
  By: string;
}

export interface IError {
  status: number;
  message: string;
}
export interface IPoint {
  top: number;
  left: number;
  width?: string;
  height?: string;
  windowKey?: string;
}

export interface IIdea {
  id?: string;
  Idea: string;
}

export interface IUser {
  username: string;
  losses: number;
  logs: number;
  lists: string[];
}
