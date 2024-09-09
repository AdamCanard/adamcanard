import { BeerData } from "../types";
import { IdContext } from "./beersheet";
import { useContext } from "react";

export default function ListElement(props: { data: BeerData }) {
  const idContext = useContext(IdContext);

  //On click pass the beers database id to the router

  const handleClick = () => {
    console.log(props.data.id);
    if (props.data.id) {
      idContext.setId(props.data.id);
    }
  };
  return (
    <>
      <div
        id="border"
        className="flex w-full h-full justify-between items-center p-2 hover:cursor-pointer"
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
