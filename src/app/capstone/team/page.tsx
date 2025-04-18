"use client";
import TeamCard from "../components/teamcard";
import Adam from "../../../../public/AdamBeer1.jpg";
import { useEffect, useState } from "react";
export default function Page() {
  const [mobile, setMobile] = useState<boolean>();

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1000px)");
    if (mql.matches) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <>
      {mobile !== undefined && (
        <>
          {mobile ? (
            <>
              <div className={"flex flex-col "}>
                <TeamCard
                  name="Adam Cunard"
                  image={Adam}
                  desc=""
                  linkdin=""
                  github=""
                  mobile={true}
                />
                <TeamCard
                  name="Jovie LaRue"
                  image={Adam}
                  desc=""
                  linkdin=""
                  github=""
                  mobile={true}
                />
                <TeamCard
                  name="Jaryd Hibbert"
                  image={Adam}
                  desc=""
                  linkdin=""
                  github=""
                  mobile={true}
                />
                <TeamCard
                  name="Mitchell Miller"
                  image={Adam}
                  desc=""
                  linkdin=""
                  github=""
                  mobile={true}
                />
              </div>
            </>
          ) : (
            <>
              <div className={"flex flex-row justify-around"}>
                <TeamCard
                  name="Adam Cunard"
                  image={Adam}
                  desc=""
                  linkdin=""
                  github=""
                />
                <TeamCard
                  name="Jovie LaRue"
                  image={Adam}
                  desc=""
                  linkdin=""
                  github=""
                />
                <TeamCard
                  name="Jaryd Hibbert"
                  image={Adam}
                  desc=""
                  linkdin=""
                  github=""
                />
                <TeamCard
                  name="Mitchell Miller"
                  image={Adam}
                  desc=""
                  linkdin=""
                  github=""
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
