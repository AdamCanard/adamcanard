import MBlackJackGame from "../mobilegames/mobileblackjack";

export default function BlackJack() {
  return (
    <div
      id="boxshadow"
      className={"w-full flex flex-col h-40"}
      key={"BlackJack"}
    >
      <h1 id="title"> BlackJack</h1>
      <MBlackJackGame />
    </div>
  );
}
