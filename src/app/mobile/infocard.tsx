import Image from "next/image";

export default function InfoCard() {
  return (
    <>
      <h1 className={"font-bold text-lg"}>
        Hey Everyone! Welcome to my website.
      </h1>
      <div id="boxShadow" className={"flex flex-row w-full"}>
        <div className={"relative w-full h-96"}>
          <Image src={"/AdamBeer1.jpg"} alt="Photo of me" fill={true} />
        </div>
        <div className={"relative w-full h-96"}>
          <Image src={"/AdamBeer2.jpg"} alt="Photo of me" fill={true} />
        </div>
      </div>
      <h2>This website is much better on desktop. Please give it a try!</h2>
      <h3 className={"text-sm"}>In the meantime play some Blackjack</h3>
    </>
  );
}
