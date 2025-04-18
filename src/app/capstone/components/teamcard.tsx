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
        <div
          className={"w-full flex flex-col h-full justify-center items-center"}
        >
          <h2 className={"text-3xl"}>{props.name}</h2>
          <Image height={"500"} src={props.image} alt="Team Image" />
          <p className={"h-24"}>{props.desc}</p>
          <div className={"flex flex-row justify-around w-full"}>
            <button className={"text-2xl"}>LinkedIn</button>
            <button className={"text-2xl"}>Github</button>
          </div>
        </div>
      ) : (
        <div
          id="border"
          className={"w-full flex flex-col h-full justify-center items-center"}
        >
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
