import Image, { StaticImageData } from "next/image";

export default function TeamCard(props: {
  name: string;
  image: StaticImageData;
  desc: string;
  linkdin: string;
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
      )}
    </>
  );
}
