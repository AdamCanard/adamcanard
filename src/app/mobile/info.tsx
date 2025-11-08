import { useCallback, useState } from "react";
import SecretCode from "./infocomps/secretcode";
import BeerImage from "./infocomps/beerimage";
import BlackJack from "./infocomps/blackjack";

export default function Info() {
  const [windows, setWindows] = useState<JSX.Element[]>([
    <BeerImage key={"BeerImage"} />,
    <SecretCode key={"SecretCode"} />,
    <BlackJack key={"BlackJack"} />,
  ]);
  const shuffle = useCallback(() => {
    const newWindows = [...windows];
    console.log(windows);
    const popped = newWindows.pop();
    newWindows.unshift(popped || <></>);

    setWindows(newWindows);
  }, [windows]);
  return (
    <div className={"flex flex-col w-full h-full"}>
      {windows.map((window: JSX.Element) => {
        return window;
      })}
      <button onClick={shuffle} id="button">
        shuffle
      </button>
    </div>
  );
}
