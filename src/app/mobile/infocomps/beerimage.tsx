import Image from "next/image";

import Photo from "../../../../public/AdamBeer1.jpg";
import { useEffect, useState } from "react";
export default function BeerImage() {
  const [show, setShow] = useState<boolean | undefined>();
  useEffect(() => {
    const mql = window.matchMedia("(max-height: 415px)");
    if (mql.matches) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  if (show)
    return (
      <div id="boxshadow" className={"flex flex-col h-full"} key={"Photo"}>
        <h1 id="title">Adam Cunard Website. Thats Me!</h1>
        <div className={"relative w-full h-full"}>
          <Image src={Photo} alt="Photo of me" fill={true} />
        </div>
      </div>
    );
}
