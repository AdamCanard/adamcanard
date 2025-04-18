"use client";
import TeamCard from "../components/teamcard";
import Adam from "../../../../public/AdamBeer1.jpg";
import Jovie from "../../../../public/Jovie.jpeg";
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

  const team = [
    {
      name: "Adam Cunard",
      image: Adam,
      contribution: "",
      desc: "",
      linkedin: "",
      github: "",
    },
    {
      name: "Jovie LaRue",
      image: Jovie,
      contribution:
        "I designed and implemented the database schema, functions, and triggers in this project, as well as worked on the frontend.",
      desc: "I'm a fast-learning motivated individual who can pick up new technologies easily. My main goal is to work with people who need software, and have great ideas, but are unable to create it themselves. I am personable and great at working in diverse teams.",
      linkedin: "https://www.linkedin.com/in/jovie-larue-swd",
      github: "https://github.com/jovielarue",
    },
    {
      name: "Adam",
      image: Adam,
      contribution: "",
      desc: "",
      linkedin: "",
      github: "",
    },
    {
      name: "Adam",
      image: Adam,
      contribution: "",
      desc: "",
      linkedin: "",
      github: "",
    },
  ];

  return (
    <>
      {mobile !== undefined && (
        <>
          {mobile ? (
            <>
              <div className={"flex flex-col "}>
                {team.map((member, index) => {
                  return <TeamCard {...member} mobile={true} key={index} />;
                })}
              </div>
            </>
          ) : (
            <>
              <div className={"flex flex-row justify-around"}>
                {team.map((member, index) => {
                  return <TeamCard {...member} key={index} />;
                })}{" "}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
