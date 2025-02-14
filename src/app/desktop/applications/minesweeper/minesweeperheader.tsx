import Image from "next/image";
import { timerListImages } from "./minesweeperimages";
import Smile from "../../../../../public/minesweeper/Minesweeper_Smile.png";
import Dead from "../../../../../public/minesweeper/Minesweeper_Dead.png";
import { useEffect, useState } from "react";

export default function MinesweeperHeader(props: {
  bombs: number;
  flags: number;
  gameState: string;
}) {
  return (
    <div className={" w-full flex flex-row justify-between items-center "}>
      <FlagCounter bombs={props.bombs} flags={props.flags} />
      <div className={"w-full flex items-center justify-center"}>
        <div id="border">
          <Image
            src={props.gameState === "lost" ? Dead : Smile}
            alt="bomb"
            width={40}
            height={40}
          />
        </div>
      </div>

      <MinesweeperTimer gameState={props.gameState} />
    </div>
  );
}

export function FlagCounter(props: { bombs: number; flags: number }) {
  const bombTotal = () => {
    const output = props.bombs - props.flags;
    if (output >= 0) {
      return output;
    }
    return 0;
  };
  return (
    <div className={"w-full flex justify-start"}>
      <div id="border" className={"flex flex-row"}>
        {" "}
        <Image
          src={timerListImages[Math.floor((bombTotal() / 100) % 10)]}
          width={30}
          height={60}
          alt="hundreth"
        />
        <Image
          src={timerListImages[Math.floor((bombTotal() / 10) % 10)]}
          width={30}
          height={60}
          alt="tenth"
        />
        <Image
          src={timerListImages[Math.floor(bombTotal() % 10)]}
          width={30}
          height={60}
          alt="oneth"
        />
      </div>
    </div>
  );
}

export function MinesweeperTimer(props: { gameState: string }) {
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [nowTime, setNowTime] = useState(Date.now());

  useEffect(() => {
    if (props.gameState === "playing") {
      setStartTime(Date.now());
      const interval = setInterval(() => {
        setNowTime(Date.now());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [props.gameState]);

  const secondsPassed = () => {
    return (nowTime - startTime) / 1000;
  };
  return (
    <div className={"w-full flex justify-end"}>
      <div id="border" className={"flex flex-row"}>
        <Image
          src={
            timerListImages[Math.floor((secondsPassed() / 100) % 10)] ||
            timerListImages[0]
          }
          width={30}
          height={60}
          alt="hundreth"
        />
        <Image
          src={
            timerListImages[Math.floor((secondsPassed() / 10) % 10)] ||
            timerListImages[0]
          }
          width={30}
          height={60}
          alt="tenth"
        />
        <Image
          src={
            timerListImages[Math.floor(((nowTime - startTime) / 1000) % 10)] ||
            timerListImages[0]
          }
          width={30}
          height={60}
          alt="oneth"
        />
      </div>
    </div>
  );
}
