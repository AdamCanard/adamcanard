import { useState } from "react";
import SecretCode from "./infocomps/secretcode";
import BeerImage from "./infocomps/beerimage";
import BlackJack from "./infocomps/blackjack";

export default function Info() {
  const [windows, setWindows] = useState<JSX.Element[]>(() => {
    const onFocus = () => {
      const newWindows = [...windows];

      const secretCodeWindowIndex = newWindows.findIndex(
        (window) => window.key === "SecretCode",
      );
      const secretCodeWindow = newWindows.splice(secretCodeWindowIndex, 1)[0];
      newWindows.unshift(secretCodeWindow);

      setWindows(newWindows);
    };
    return [
      <BeerImage key={"BeerImage"} />,
      <SecretCode key={"SecretCode"} onFocus={onFocus} />,
      <BlackJack key={"BlackJack"} />,
    ];
  });

  return (
    <div className={"flex flex-col w-full h-full"}>
      {windows.map((window: JSX.Element) => {
        return window;
      })}
    </div>
  );
}
