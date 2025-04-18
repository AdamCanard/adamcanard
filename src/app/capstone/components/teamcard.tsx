import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function TeamCard(props: {
  name: string;
  image: StaticImageData;
  contribution: string;
  desc: string;
  linkedin: string;
  github: string;
  mobile?: boolean;
}) {
  return (
    <>
      {props.mobile ? (
        <>
          <div
            id="border"
            className={
              "w-full flex flex-col h-full justify-center items-center"
            }
          >
            <div className={"flex flex-row h-full "}>
              <div className={"flex flex-col w-full h-full"}>
                <h2 id="border" className={"text-2xl text-center"}>
                  {props.name}
                </h2>{" "}
                <Image
                  className={"w-full h-full"}
                  id="border"
                  src={props.image}
                  alt="Team Image"
                />
                <div className={"flex flex-row w-full justify-around "}>
                  <Link
                    id="button"
                    href={props.linkedin}
                    className={"text-lg  "}
                  >
                    LinkedIn
                  </Link>
                  <Link id="button" href={props.github} className={"text-lg"}>
                    Github
                  </Link>
                </div>
              </div>
              <div className={"flex flex-col w-full h-full"}>
                <div className={"h-full"}>
                  <p id="border" className={" "}>
                    {props.contribution}
                  </p>
                  <p id="border" className={""}>
                    {props.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div id="border" className={"w-full flex flex-col items-center h-fit"}>
          <h2 id="border" className={"text-3xl w-full text-center"}>
            {props.name}
          </h2>
          <Image
            id="border"
            width={500}
            height={"500"}
            src={props.image}
            alt="Team Image"
          />
          <p id="border" className={" text-lg"}>
            {props.contribution}
          </p>
          <p id="border" className={""}>
            {props.desc}
          </p>
          <div className={"flex flex-row justify-end w-full"}>
            <Link id="button" href={props.linkedin} className={"text-lg  "}>
              LinkedIn
            </Link>
            <Link id="button" href={props.github} className={"text-lg"}>
              Github
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
