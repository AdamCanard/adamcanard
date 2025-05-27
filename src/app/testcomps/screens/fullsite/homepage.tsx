import Image from "next/image";
import MadeLogo from "../../../../../public/Mitchell.jpeg";

export default function Homepage() {
  //things to find
  // 1. logo
  // 2. about us page
  //  2a. Adam
  //  2b. Everest
  //  2c. Domonique
  //  2d. Mieke
  //  2e. Sebastien
  // 3. games page
  //  3a. Exhabition
  //  3b. The Agency

  return (
    <div
      className={
        "GridSize bg-white relative flex  flex-col justify-around items-center"
      }
    >
      <Image src={MadeLogo} alt="made games log" width={150} height={150} />
      <div className={"flex flex-row justify-around w-full"}>
        {" "}
        <div
          className={
            "w-20 h-12 bg-black text-white flex justify-center items-center"
          }
        >
          About
        </div>
        <div
          className={
            "w-20 h-12 bg-black text-white flex justify-center items-center"
          }
        >
          Games
        </div>
      </div>
    </div>
  );
}
