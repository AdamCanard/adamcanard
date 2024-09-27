"use client";
import {
  ChangeEvent,
  createContext,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Deck } from "./deck";
import CardBack from "../../../public/Cards/CardBack.png";
import Image from "next/image";
import DraggableWindow from "../semantics/draggablewindow";
import WindowButton from "../semantics/windowbutton";

export interface IBlackJackContext {
  DeckKeys: string[];
  setDeckKeys: React.Dispatch<SetStateAction<string[]>>;
  player: string[];
  setPlayer: React.Dispatch<SetStateAction<string[]>>;
  dealer: string[];
  setDealer: React.Dispatch<SetStateAction<string[]>>;
  setGameTrigger: React.Dispatch<SetStateAction<boolean>>;
}

//cast empty object to contexttype
export const BlackJackContext = createContext<IBlackJackContext>(
  {} as IBlackJackContext
);

export default function BlackJack() {
  //create state for deck

  const [DeckKeys, setDeckKeys] = useState<string[]>(Object.keys(Deck));
  const [dealer, setDealer] = useState<string[]>([]);
  const [player, setPlayer] = useState<string[]>([]);
  const [gameTrigger, setGameTrigger] = useState<boolean>(false);
  const [wager, setWager] = useState<number>(0);

  function StartRound() {
    Shuffle(DeckKeys, setDeckKeys);
    Draw(DeckKeys, setDeckKeys, dealer, setDealer);
    Draw(DeckKeys, setDeckKeys, player, setPlayer);
    Draw(DeckKeys, setDeckKeys, dealer, setDealer);
    Draw(DeckKeys, setDeckKeys, player, setPlayer);
    setGameTrigger(true);
  }

  const handleClick = () => {
    StartRound();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const wager = e.target.value;
    setWager(+wager);
  };

  return (
    <DraggableWindow title={"BlackJack"} width={"60"} heigth={"96"}>
      {!gameTrigger ? (
        <>
          <label className="flex justify-between gap-1">
            Wager:
            <input
              type="number"
              name="wager"
              value={wager}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <WindowButton>
            <button
              id="button"
              className="hover:cursor-pointer"
              onClick={handleClick}
            >
              Start
            </button>
          </WindowButton>
        </>
      ) : (
        <BlackJackContext.Provider
          value={{
            DeckKeys,
            setDeckKeys,
            player,
            setPlayer,
            dealer,
            setDealer,
            setGameTrigger,
          }}
        >
          <BlackJackGame />
        </BlackJackContext.Provider>
      )}
    </DraggableWindow>
  );
}

export function BlackJackGame() {
  const blackJackContext = useContext(BlackJackContext);
  const [reveal, setReveal] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");

  const EndRound = useCallback(() => {
    //dealer hits on 16 and soft 17
    setReveal(true);
    const dealerHit = () => {
      const evaluatedHand = BJEvaluateHand(blackJackContext.dealer);
      if (evaluatedHand.includes("/")) {
        const soft = +evaluatedHand.split("/")[1];
        if (soft <= 17) {
          return true;
        }
      } else {
        if (+evaluatedHand <= 16) {
          return true;
        }
      }
      return false;
    };

    while (dealerHit()) {
      Draw(
        blackJackContext.DeckKeys,
        blackJackContext.setDeckKeys,
        blackJackContext.dealer,
        blackJackContext.setDealer
      );
    }

    if (blackJackContext.DeckKeys.length < 20) {
      blackJackContext.setDeckKeys(Object.keys(Deck));
    }

    const playerEvaluatedHand = BJEvaluateHand(blackJackContext.player);
    let playervalue;
    const dealerEvaluatedHand = BJEvaluateHand(blackJackContext.dealer);
    let dealervalue;

    if (playerEvaluatedHand.includes("/")) {
      playervalue = +playerEvaluatedHand.split("/")[1];
    } else {
      playervalue = +playerEvaluatedHand;
    }

    if (dealerEvaluatedHand.includes("/")) {
      dealervalue = +dealerEvaluatedHand.split("/")[1];
    } else {
      dealervalue = +dealerEvaluatedHand;
    }

    //WIN
    if (playervalue <= 21 && (playervalue > dealervalue || dealervalue > 21)) {
      setWinner("Player");
    } else if (
      //PUSH
      playervalue === dealervalue ||
      (playervalue > 21 && dealervalue > 21)
    ) {
      setWinner("Nobody");
    } else {
      setWinner("Dealer");
      //womp womp
    }
  }, [blackJackContext]);

  useEffect(() => {
    const evaluatedHand = BJEvaluateHand(blackJackContext.player);
    let handvalue;

    if (evaluatedHand.includes("/")) {
      handvalue = 0;
    } else {
      handvalue = +evaluatedHand;
    }
    if (handvalue > 21) {
      EndRound();
    }
  }, [EndRound, blackJackContext.player]);

  const reset = () => {
    blackJackContext.setPlayer([]);
    blackJackContext.setDealer([]);
    blackJackContext.setGameTrigger(false);
  };

  const Hit = () => {
    Draw(
      blackJackContext.DeckKeys,
      blackJackContext.setDeckKeys,
      blackJackContext.player,
      blackJackContext.setPlayer
    );
  };

  useEffect(() => {
    console.log(blackJackContext.player);
  }, [blackJackContext.player]);

  return (
    <>
      <div className="flex flex-col w-full ">
        {reveal ? (
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col ">
              <CardRow hand={blackJackContext.player} cover={false} />
              <CardRow hand={blackJackContext.dealer} cover={false} />
            </div>
            <div className="flex flex-col justify-end items-center text-center gap-2">
              <div>{winner + " \nWINS!"}</div>
              <Button title="END" func={() => reset()} />
            </div>
          </div>
        ) : (
          <>
            <CardRow hand={blackJackContext.player} cover={false} />

            <CardRow hand={blackJackContext.dealer} cover={true} />
            <WindowButton>
              <div id="button" onClick={Hit}>
                Hit
              </div>
              <div id="button" onClick={() => EndRound()}>
                Stand
              </div>
            </WindowButton>
          </>
        )}
      </div>
    </>
  );
}

export function Button(props: { title: string; func: () => void }) {
  return (
    <div
      id="border"
      className="w-16 h-10 hover:cursor-pointer text-center leading-5"
      onClick={props.func}
    >
      {props.title}
    </div>
  );
}

export function CardRow(props: { hand: string[]; cover: boolean }) {
  return (
    <div
      id="border-s"
      className="flex h-full w-full justify-between items-center p-1 gap-1"
    >
      <div className="flex justify-start">
        {props.cover ? (
          <>
            {props.hand.map((card: string, index: number) => {
              if (index === 0) {
                return (
                  <Image
                    src={CardBack}
                    height={40}
                    width={32}
                    alt="Playing Card"
                    key={index}
                  />
                );
              } else {
                return (
                  <Image
                    src={Deck[card]}
                    height={40}
                    width={32}
                    alt="Playing Card"
                    key={index}
                  />
                );
              }
            })}
          </>
        ) : (
          <>
            {props.hand.map((card: string, index: number) => {
              return (
                <Image
                  src={Deck[card]}
                  height={40}
                  width={32}
                  alt="Playing Card"
                  key={index}
                />
              );
            })}
          </>
        )}
      </div>
      {props.cover ? (
        <div id="border-s" className="h-10 w-8 text-center leading-7">
          {BJEvaluateHand(props.hand.slice(1))}
        </div>
      ) : (
        <div id="border-s" className="h-10 w-8 text-center leading-7">
          {BJEvaluateHand(props.hand)}
        </div>
      )}
    </div>
  );
}

export function Shuffle(
  Deck: string[],
  DeckSetter: React.Dispatch<SetStateAction<string[]>>
) {
  const newDeck = Deck;
  let currentIndex = newDeck.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newDeck[currentIndex], newDeck[randomIndex]] = [
      newDeck[randomIndex],
      newDeck[currentIndex],
    ];
  }
  DeckSetter(newDeck);
}
export function Draw(
  Deck: string[],
  DeckSet: React.Dispatch<SetStateAction<string[]>>,
  Hand: string[],
  HandSet: React.Dispatch<SetStateAction<string[]>>
) {
  const newDeck = Deck;
  const draw = newDeck.splice(0, 1);
  Hand.push(draw[0]);
  HandSet(Hand);
  DeckSet(newDeck);
}

export function BJEvaluateHand(Hand: string[]) {
  let value = 0;
  let ace = false;

  for (let i = 0; i < Hand.length; i++) {
    const element = Hand[i];
    const temp = element.split(":")[0];

    if (temp === "J" || temp === "Q" || temp === "K") {
      value += 10;
    } else if (temp === "A") {
      value += 1;
      ace = true;
    } else {
      value += +temp;
    }
  }

  if (ace) {
    if (value + 10 > 21) {
      return value + "";
    } else {
      return value + "/" + (value + 10);
    }
  } else {
    return value + "";
  }
}

export function BJFinalHand(Hand: string[]) {
  let value = 0;
  let ace = false;

  for (let i = 0; i < Hand.length; i++) {
    const element = Hand[i];
    const temp = element.split(":")[0];

    if (temp === "J" || temp === "Q" || temp === "K") {
      value += 10;
    } else if (temp === "A") {
      value += 1;
      ace = true;
    } else {
      value += +temp;
    }
  }

  if (ace) {
    if (value + 10 > 21) {
      return value + "";
    } else {
      return value + 10;
    }
  } else {
    return value + "";
  }
}
