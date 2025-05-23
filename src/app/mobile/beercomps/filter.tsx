import { useContext } from "react";
import { BeerContext } from "../beer";

export default function Filter() {
  const { filter, removeFilter, keywords, removeKeyword } =
    useContext(BeerContext);
  return (
    <div id="border" className={"h-10 flex items-center overflow-x-scroll"}>
      <div>Filter: </div>
      {Object.keys(filter).map((searchKey, index) => {
        return (
          <div key={index} className={"flex"}>
            <div className={"Keyword"} onClick={() => removeFilter(searchKey)}>
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
  );
}
