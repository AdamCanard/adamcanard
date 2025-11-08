import { useState } from "react";
import SecretCode from "./infocomps/secretcode";
import BeerImage from "./infocomps/beerimage";
import BlackJack from "./infocomps/blackjack";

export default function Info() {
  const [windows] = useState<JSX.Element[]>([
    <SecretCode key={"SecretCode"} />,
    <BeerImage key={"BeerImage"} />,
    <BlackJack key={"BlackJack"} />,
  ]);

  return (
    <div className={"flex flex-col w-full h-full"}>
      {windows.map((window: JSX.Element) => {
        return window;
      })}
    </div>
  );
}
