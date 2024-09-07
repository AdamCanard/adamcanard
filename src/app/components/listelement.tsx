import { useRouter } from "next/navigation";
import { BeerData } from "../types";

export default function ListElement(props: { data: BeerData }) {
  const router = useRouter();
  //On click pass the beers database id to the router
  const handleClick = () => {
    router.push("/beer/" + props.data.id);
  };
  return (
    <>
      <div
        id="border"
        className="flex w-full h-12 justify-between items-center p-2 hover:cursor-pointer"
        onClick={handleClick}
      >
        <>
          <div>{props.data.Beer}</div>
          <div>{props.data.Brewery}</div>
          {props.data.Rating != 0 ? (
            <div>{props.data.Rating}</div>
          ) : (
            <div>{props.data.By}</div>
          )}
        </>
      </div>
    </>
  );
}
