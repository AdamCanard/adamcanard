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

  const similarityScore = useCallback(
    (word: string) => {
      const lowerValue = value.toLowerCase();
      if (word === lowerValue) {
        return 2;
      } else if (lowerValue.startsWith(word[0])) {
        for (let i = 0; i < word.length; i++) {
          if (!lowerValue.startsWith(word.slice(0, i))) {
            return 1 + i + 1 / (word.length - lowerValue.length);
          }
        }
        return 2;
      } else if (word.includes(lowerValue)) {
        return 1 + 1 / Math.abs(word.length - lowerValue.length);
      } else {
        return 1 / (word.length - lowerValue.length);
      }
    },
    [value],
  );

  const sortBySimilarity = useCallback(
    (similarList: string[]) => {
      return similarList.toSorted(
        (a, b) =>
          similarityScore(b.toLowerCase()) - similarityScore(a.toLowerCase()),
      );
    },
    [similarityScore],
  );

  useEffect(() => {
    const newSimilarList: string[] = [];
    const uniqueBeerValues: string[] = [];

    for (let i = 0; i < beers.length; i++) {
      if (
        !uniqueBeerValues.includes(
          beers[i][props.name as keyof object] as string,
        ) &&
        (beers[i][props.name as keyof object] as string) !== value
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

    setSimilarlist(sortBySimilarity(newSimilarList));
  }, [beers, value, props.name, isWordSimilarToValue, sortBySimilarity]);
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
        {similarList && value !== "" && (
          <div
            className={"absolute w-full h-fit max-h-28 z-10 overflow-y-auto"}
          >
            {similarList.map((similarWord) => {
              if (value !== similarWord) {
                return (
                  <div
                    className={"Border p-0 w-full"}
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
