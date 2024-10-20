import Image from "next/image";
import Window from "../components/semanticcomps/window";
import WindowInternal from "../components/semanticcomps/windowinternal";
import MBlackJackGame from "../components/blackjackcomps/mobileblackjack";

export default function InfoCard() {
  return (
    <>
      <Window title=" Hey Everyone! Welcome to my website.">
        <WindowInternal>
          <div className={"flex flex-row"}>
            <div className={"relative w-full h-96"}>
              <Image src={"/AdamBeer1.jpg"} alt="Photo of me" fill={true} />
            </div>
            <div className={"relative w-full h-96"}>
              <Image src={"/AdamBeer2.jpg"} alt="Photo of me" fill={true} />
            </div>
          </div>
        </WindowInternal>
      </Window>

      <div className={"flex flex-row w-full h-full"}>
        <div className={"w-full h-full"}>
          <h1 id="title"> BlackJack</h1>
          <div id="boxshadowNP">
            <MBlackJackGame />
          </div>
        </div>
        <div className={"flex flex-col w-full h-full"}>
          <h1 id="title">Information</h1>
          <div id="boxshadowNP" className={"flex flex-col w-full h-full"}>
            <div className={"w-full h-full px-2 text-sm font-bold"}>
              If you want to see what im really capable of, visit this site on
              desktop! In the meantime, play some BlackJack or check out my
              links
            </div>
            <div className={"flex w-full gap-2 justify-end items-end pb-1"}>
              <div id="button">Instagram</div>
              <div id="button">LinkedIn</div>
              <div id="button">GitHub</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
