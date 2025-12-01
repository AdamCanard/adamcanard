export interface IPlayerType {
  row: number;
  col: number;
  direction: string;
}

export interface IRoomCoord {
  row: number;
  col: number;
}
export interface ITileObject {
  row: number;
  col: number;
  value: string;
  element: JSX.Element;
}
