import { useCallback, useContext, useEffect, useState } from "react";
import { BeerContext } from "../../beer";

export default function InputSelect(props: { name: string }) {
  const { beers } = useContext(BeerContext);
  const [value, setValue] = useState("");
  const [similarList, setSimilarlist] = useState<string[]>([]);
  const isWordSimilarToValue = useCallback(
    (word: string) => {
      if (word.toLowerCase().includes(value.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    },
    [value],
  );
  useEffect(() => {
    const newSimilarList: string[] = [];
    const uniqueBeerValues: string[] = [];

    for (let i = 0; i < beers.length; i++) {
      if (
        !uniqueBeerValues.includes(
          beers[i][props.name as keyof object] as string,
        )
      ) {
        uniqueBeerValues.push(beers[i][props.name as keyof object] as string);
      }
    }

    for (let i = 0; i < uniqueBeerValues.length; i++) {
      const beerValue = uniqueBeerValues[i];

      if (value && isWordSimilarToValue(beerValue)) {
        newSimilarList.push(beerValue);
      }
    }

    setSimilarlist(newSimilarList);
  }, [beers, value, props.name, isWordSimilarToValue]);
  return (
    <div id={"border"} className={"w-full flex justify-between items-center"}>
      <label className={"pl-1 w-full"}>Brewery:</label>
      <div className={"w-full relative"}>
        <input
          autoComplete="off"
          className={"w-full"}
          type="text"
          name={props.name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {similarList && similarList[0] !== value && value !== "" && (
          <div className={"absolute Border w-full h-fit max-h-40"}>
            {similarList.map((similarWord) => {
              if (value !== similarWord) {
                return (
                  <div
                    className={" Border w-full"}
                    onClick={() => {
                      setValue(similarWord);
                    }}
                    key={similarWord}
                  >
                    {similarWord}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
