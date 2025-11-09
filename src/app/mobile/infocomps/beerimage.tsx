import Image from "next/image";

import Photo from "../../../../public/AdamBeer1.jpg";
export default function BeerImage() {
  return (
    <div
      id="boxshadow"
      className={"flex flex-col h-full max-h-1/2"}
      key={"Photo"}
    >
      <h1 id="title">Adam Cunard Website. Thats Me!</h1>
      <div className={"relative w-full h-full"}>
        <Image src={Photo} alt="Photo of me" fill={true} />
      </div>
    </div>
  );
}
