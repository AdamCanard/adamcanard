import { useContext } from "react";
import { BeerContext } from "../beer";

export default function Filter() {
  const { filter, removeFilter, keywords, removeKeyword, clear } =
    useContext(BeerContext);
  return (
    <div id="border" className={"h-fit w-full flex items-center gap-x-2"}>
      <div className={"Keyword"} onClick={clear}>
        Filter:
      </div>
      <div className={"flex flex-wrap"}>
        {" "}
        {Object.keys(filter).map((searchKey, index) => {
          return (
            <div key={index} className={"flex"}>
              <div
                className={"Keyword"}
                onClick={() => removeFilter(searchKey)}
              >
                {Object.values(filter)[index]}
              </div>
            </div>
          );
        })}{" "}
        {keywords.map((keyword, index) => {
          return (
            <div key={index} className={"flex"}>
              <div className={"Keyword"} onClick={() => removeKeyword(keyword)}>
                {keyword}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
