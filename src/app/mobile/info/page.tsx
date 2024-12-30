"use client";
import Image from "next/image";
import MBlackJackGame from "../../components/blackjackcomps/mobileblackjack";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div className={"flex flex-col w-full h-full"}>
        <div id="boxshadow" className={"flex flex-col h-full"}>
          <h1 id="title">Adam Cunard Website. Thats Me!</h1>
          <div className={"relative w-full h-full"}>
            <Image src={"/AdamBeer1.jpg"} alt="Photo of me" fill={true} />
          </div>
        </div>

        <div id="boxshadow" className={"flex flex-col w-full h-40"}>
          <h1 id="title">Information</h1>
          <div id="boxshadowNP" className={"flex flex-col w-full h-full"}>
            <div className={"w-full h-full px-2 text-lg "}>
              If you want to see what im really capable of, visit this site on
              desktop! In the meantime, play some BlackJack or check out my
              links
            </div>
            <div
              className={"flex w-full gap-2 justify-end items-end pb-1 pr-1"}
            >
              <a href="https://www.instagram.com/adam_cunard/" id="button">
                Instagram
              </a>
              <a
                href="https://ca.linkedin.com/in/adam-cunard-3a4644287?trk=people-guest_people_search-card"
                id="button"
              >
                LinkedIn
              </a>
              <a href="https://github.com/AdamCanard" id="button">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div id="boxshadow" className={"w-full flex flex-col"}>
          <h1
            id="title"
            onClick={() => {
              router.push("mobile/secret");
            }}
          >
            {" "}
            BlackJack
          </h1>
          <MBlackJackGame />
        </div>
      </div>
    </>
  );
}
