import MobilePage from "../mobile/mobilepage";

export const start = [
  ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "A", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "E", "E", "E", "E", "E", "E", "E", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
];

export const actions: Record<string, JSX.Element> = {
  "2:2": <MobilePage />,
};
