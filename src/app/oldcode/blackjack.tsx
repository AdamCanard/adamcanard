import {
  ChangeEvent,
  createContext,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { Deck } from "./gameobjects";
import { BJEvaluateHand, Draw, Shuffle } from "../blackjackcomps/deckfunctions";
import CardBack from "../../../../public/Cards/CardBack.png";
import { GameContext } from "./game";

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

interface GameInputs {
  game: string;
  wager: number;
}

export function BlackJack() {
  //create state for deck
  const gameContext = useContext(GameContext);
  const [DeckKeys, setDeckKeys] = useState<string[]>(Object.keys(Deck));
  const [dealer, setDealer] = useState<string[]>([]);
  const [player, setPlayer] = useState<string[]>([]);
  const [gameTrigger, setGameTrigger] = useState<boolean>(false);
  const [inputs, setInputs] = useState<GameInputs>({
    game: "blackjack",
    wager: 10,
  });

  function StartRound() {
    Shuffle(DeckKeys, setDeckKeys);
    Draw(DeckKeys, setDeckKeys, dealer, setDealer);
    Draw(DeckKeys, setDeckKeys, player, setPlayer);
    Draw(DeckKeys, setDeckKeys, dealer, setDealer);
    Draw(DeckKeys, setDeckKeys, player, setPlayer);
    setGameTrigger(true);
  }

  const handleClick = () => {
    if (inputs.wager >= 10) {
      if (gameContext.state.sips >= inputs.wager) {
        gameContext.dispatch({ type: "WAGER", wager: inputs.wager });
        StartRound();
      }
    }
  };

  //round wages when they enter inputs
  const allIn = () => {
    if (gameContext.state.sips >= 10) {
      gameContext.dispatch({ type: "WAGER", wager: gameContext.state.sips });
      setInputs({
        ...inputs,
        wager: Math.round(gameContext.state.sips),
      });
      StartRound();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      {!gameTrigger ? (
        <>
          <div
            id="border"
            className="h-full w-full col-span-2 row-span-1 flex flex-col justify-start items-center p-2 gap-2"
          >
            <label className="flex justify-between gap-1">
              Game:
              <input
                type="text"
                name="game"
                value={inputs.game}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label className="flex justify-between gap-1">
              Wager:
              <input
                type="number"
                name="wager"
                value={inputs.wager}
                onChange={(e) => handleChange(e)}
              />
            </label>
            <div className="flex flex-row gap-2">
              <button
                id="border"
                className="hover:cursor-pointer"
                onClick={handleClick}
              >
                Start Game
              </button>
              <button
                id="border"
                className="hover:cursor-pointer"
                onClick={allIn}
              >
                ALL-IN
              </button>
            </div>
          </div>
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
          <BlackJackGame wager={inputs.wager} />
        </BlackJackContext.Provider>
      )}
    </>
  );
}

export function BlackJackGame(props: { wager: number }) {
  const blackJackContext = useContext(BlackJackContext);
  const gameContext = useContext(GameContext);
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

    let playerEvaluatedHand = BJEvaluateHand(blackJackContext.player);
    let playervalue;
    let dealerEvaluatedHand = BJEvaluateHand(blackJackContext.dealer);
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
      gameContext.dispatch({ type: "WIN", win: props.wager * 2 });
      setWinner("Player");
    } else if (
      //PUSH
      playervalue === dealervalue ||
      (playervalue > 21 && dealervalue > 21)
    ) {
      gameContext.dispatch({ type: "WIN", win: props.wager });
      setWinner("Nobody");
    } else {
      setWinner("Dealer");
      //womp womp
    }
  }, [blackJackContext, gameContext, props.wager]);

  useEffect(() => {
    let evaluatedHand = BJEvaluateHand(blackJackContext.player);
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

  return (
    <>
      <div className="flex flex-row w-full col-span-2 row-span-1">
        <div
          id="border"
          className="flex flex-col w-64 h-32 p-2 items-center justify-center"
        >
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
              <div className="flex flex-row h-full w-full gap-2 items-center text-center">
                <Button
                  title="HIT"
                  func={() =>
                    Draw(
                      blackJackContext.DeckKeys,
                      blackJackContext.setDeckKeys,
                      blackJackContext.player,
                      blackJackContext.setPlayer
                    )
                  }
                />
                <Button title="STAND" func={() => EndRound()} />

                <CardRow hand={blackJackContext.dealer} cover={true} />
              </div>
            </>
          )}
        </div>
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
