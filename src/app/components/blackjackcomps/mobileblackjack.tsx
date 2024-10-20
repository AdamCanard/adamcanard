"use client";
import { useCallback, useEffect, useState } from "react";

import { Deck } from "./deck";
import CardBack from "../../../../public/Cards/CardBack.png";
import Image from "next/image";
import WindowButton from "../semanticcomps/windowbutton";
import { BJEvaluateHand, Shuffle } from "./deckfunctions";

export default function MBlackJackGame() {
  const [reveal, setReveal] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  const [DeckKeys, setDeckKeys] = useState<string[]>(Object.keys(Deck));
  const [dealer, setDealer] = useState<string[]>([]);
  const [player, setPlayer] = useState<string[]>([]);

  const StartRound = useCallback(() => {
    Shuffle(DeckKeys, setDeckKeys);

    const draw = DeckKeys.splice(0, 4);
    setDealer([draw[0], draw[2]]);
    setPlayer([draw[1], draw[3]]);
    setDeckKeys(DeckKeys);
  }, [DeckKeys]);
  useEffect(() => {
    StartRound();
  }, [StartRound]);

  const drawPlayer = () => {
    const draw = DeckKeys.splice(0, 1);
    setPlayer([...player, draw[0]]);
    setDeckKeys(DeckKeys);
  };
  const drawDealer = useCallback(() => {
    const draw = DeckKeys.splice(0, 1);
    const newDealer = dealer;
    newDealer.push(draw[0]);
    setDealer(newDealer);
    setDeckKeys(DeckKeys);
  }, [DeckKeys, dealer, setDealer, setDeckKeys]);

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
      drawDealer();
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
  }, [DeckKeys.length, dealer, drawDealer, player, setDeckKeys]);

  const reset = () => {
    setPlayer([]);
    setDealer([]);
    setReveal(false);
    setWinner("");
    StartRound();
  };

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
    <>
      <div className="flex flex-col w-full ">
        {reveal ? (
          <div className="flex flex-col w-full justify-between items-center">
            <div className="flex flex-col w-full">
              <MCardRow hand={player} cover={false} />
              <MCardRow hand={dealer} cover={false} />
            </div>
            <div className="flex flex-row w-full justify-end items-center text-center gap-2">
              <div>{winner + " \nWINS!"}</div>

              <div id="button" onClick={() => reset()}>
                Again
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col ">
            <MCardRow hand={player} cover={false} />
            <MCardRow hand={dealer} cover={true} />
            <WindowButton>
              <div id="button" onClick={drawPlayer}>
                Hit
              </div>
              <div id="button" onClick={() => EndRound()}>
                Stand
              </div>
            </WindowButton>
          </div>
        )}
      </div>
    </>
  );
}

export function MCardRow(props: { hand: string[]; cover: boolean }) {
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
        <div id="border-s" className="h-10 w-12 text-center leading-8">
          {BJEvaluateHand(props.hand.slice(1))}
        </div>
      ) : (
        <div id="border-s" className="h-10 w-12 text-center leading-8">
          {BJEvaluateHand(props.hand)}
        </div>
      )}
    </div>
  );
}
