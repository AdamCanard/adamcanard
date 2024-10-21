import Image from "next/image";
import MBlackJackGame from "../components/blackjackcomps/mobileblackjack";

export default function InfoCard() {
  return (
    <>
      <div id="boxshadow">
        <h1 id="title">Adam Cunard Website. Thats Me!</h1>
        <div className={"flex flex-row"}>
          <div className={"relative w-full h-32"}>
            <Image src={"/AdamBeer1.jpg"} alt="Photo of me" fill={true} />
          </div>
        </div>
      </div>

      <div className={"flex flex-col w-full h-full"}>
        <div id="boxshadow" className={"flex flex-col w-full h-full"}>
          <h1 id="title">Information</h1>
          <div id="boxshadowNP" className={"flex flex-col w-full h-full"}>
            <div className={"w-full h-full px-2 text-xl "}>
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
        <div id="boxshadow" className={"w-full flex flex-col"}>
          <h1 id="title"> BlackJack</h1>
          <MBlackJackGame />
        </div>
      </div>
    </>
  );
}
