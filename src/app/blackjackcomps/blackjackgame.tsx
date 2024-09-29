"use client";
import {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Deck } from "./deck";
import CardBack from "../../../public/Cards/CardBack.png";
import Image from "next/image";
import DraggableWindow from "../semantics/draggablewindow";
import WindowButton from "../semantics/windowbutton";
import { BJEvaluateHand, Shuffle } from "./deckfunctions";

export default function BlackJack() {
  const [DeckKeys, setDeckKeys] = useState<string[]>(Object.keys(Deck));
  const [dealer, setDealer] = useState<string[]>([]);
  const [player, setPlayer] = useState<string[]>([]);
  const [gameTrigger, setGameTrigger] = useState<boolean>(false);
  const [wager, setWager] = useState<number>(0);
  const [reveal, setReveal] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");

  function StartRound() {
    Shuffle(DeckKeys, setDeckKeys);
    Draw(dealer, setDealer);
    Draw(player, setPlayer);
    Draw(dealer, setDealer);
    Draw(player, setPlayer);
    setGameTrigger(true);
  }

  const handleClick = () => {
    StartRound();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const wager = e.target.value;
    setWager(+wager);
  };

  const reset = () => {
    setPlayer([]);
    setDealer([]);
    setGameTrigger(false);
  };

  const Draw = useCallback(
    (Hand: string[], HandSet: React.Dispatch<SetStateAction<string[]>>) => {
      const newDeck = DeckKeys;
      const draw = newDeck.splice(0, 1);
      const newHand = Hand;
      newHand.push(draw[0]);
      HandSet(newHand);
      setDeckKeys(newDeck);
    },
    [DeckKeys]
  );

  const EndRound = useCallback(() => {
    //dealer hits on 16 and soft 17
    setReveal(true);
    const dealerHit = () => {
      const evaluatedHand = BJEvaluateHand(dealer);
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
      Draw(dealer, setDealer);
    }

    if (DeckKeys.length < 20) {
      setDeckKeys(Object.keys(Deck));
    }

    const playerEvaluatedHand = BJEvaluateHand(player);
    let playervalue;
    const dealerEvaluatedHand = BJEvaluateHand(dealer);
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
  }, [DeckKeys, Draw, dealer, player]);

  useEffect(() => {
    const evaluatedHand = BJEvaluateHand(player);
    let handvalue;

    if (evaluatedHand.includes("/")) {
      handvalue = 0;
    } else {
      handvalue = +evaluatedHand;
    }
    if (handvalue > 21) {
      EndRound();
    }
  }, [EndRound, player]);

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
        <div className="flex flex-col w-full ">
          {reveal ? (
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-col ">
                <CardRow hand={player} cover={false} />
                <CardRow hand={dealer} cover={false} />
              </div>
              <div className="flex flex-col justify-end items-center text-center gap-2">
                <div>{winner + " \nWINS!"}</div>

                <div id="button" onClick={() => reset()}>
                  Again
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col ">
                <CardRow hand={player} cover={false} />

                <CardRow hand={dealer} cover={true} />
                <WindowButton>
                  <div id="button" onClick={() => Draw(player, setPlayer)}>
                    Hit
                  </div>
                  <div id="button" onClick={() => EndRound()}>
                    Stand
                  </div>
                </WindowButton>
              </div>
            </>
          )}
        </div>
      )}
      ;
    </DraggableWindow>
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
      className="flex h-full w-64 justify-between items-center p-1 gap-1"
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
                    key={card}
                  />
                );
              } else {
                return (
                  <Image
                    src={Deck[card]}
                    height={40}
                    width={32}
                    alt="Playing Card"
                    key={card}
                  />
                );
              }
            })}
          </>
        ) : (
          <>
            {props.hand.map((card: string) => {
              return (
                <Image
                  src={Deck[card]}
                  height={40}
                  width={32}
                  alt="Playing Card"
                  key={card}
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
