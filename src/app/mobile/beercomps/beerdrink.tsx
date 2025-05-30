import { FormEvent, useContext, useState } from "react";
import { BeerContext } from "../beer";
import BeerReviewInput from "./inputs/beerreviewinput";
import BeerImageInput from "./inputs/beerimageinput";
import BeerRatingInput from "./inputs/beerratinginput";
import LabeledBeerInput from "./inputs/labeledbeerinput";
import { fileToB64 } from "./beeradder";
import AdminSubmit from "./inputs/adminsubmit";

export default function BeerDrink() {
  const { beer, back, mutateBeer } = useContext(BeerContext);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const admin = formData.get("admin") as string;
    if (admin === process.env.NEXT_PUBLIC_ADMINPASS) {
      const file = formData.get("image") as File;
      if (file.size > 0) {
        const image = await fileToB64(formData.get("image") as File);
        formData.set("image", image as string);
      } else {
        formData.delete("image");
      }
      try {
        const response = await fetch("/api/beer/" + beer._id, {
          method: "PATCH",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        mutateBeer(data.newBeer);
        back();
      } catch (err: unknown) {
        if (err instanceof Error) {
          return new Response(
            JSON.stringify({ error: err.message || err.toString() }),
            {
              status: 500,
              headers: {},
            },
          );
        } else {
          console.log(err);
        }
      }
    }
  };
  return (
    <div className={"w-full h-full flex flex-col"}>
      <form id="border" className={"flex flex-col"} onSubmit={handleSubmit}>
        <BeerRatingInput />
        {beer.recommended === "" && (
          <LabeledBeerInput label="Suggested" name="recommended" type="text" />
        )}
        <KeywordSelect />
        <BeerImageInput />
        {beer.review === "" && <BeerReviewInput />}

        <BeerDescription />
        <AdminSubmit />
      </form>
    </div>
  );
}

function BeerDescription() {
  const { beer } = useContext(BeerContext);
  const [desc, setDesc] = useState(beer.desc);
  return (
    <div id="border" className={" flex-col flex"}>
      {" "}
      <div className="flex justify-between w-full relative h-8">
        <h1 id="title" className="w-full">
          Enter Beer Description:
        </h1>
      </div>
      <textarea
        name="desc"
        value={desc}
        className={"h-32"}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
    </div>
  );
}
function KeywordSelect() {
  const { beers, beer } = useContext(BeerContext);
  const [selected, setSelected] = useState("");
  const [input, setInput] = useState("");
  const [chosenKeywords, setChosenKeywords] = useState<string[]>(
    beer.keywords || [],
  );
  const keywords: string[] = [];
  for (const beer of beers) {
    for (const keyword of beer.keywords || []) {
      if (!keywords.includes(keyword)) {
        keywords.push(keyword);
      }
    }
  }
  const addChosenKeyword = (keyword: string) => {
    if (keyword === "~") {
      setSelected("~");
    } else {
      const newChosenKeywords = [...chosenKeywords];
      newChosenKeywords.push(keyword);
      setChosenKeywords(newChosenKeywords);
    }
  };

  const removeChosenKeyword = (keyword: string) => {
    const newChosenKeywords = [...chosenKeywords];
    newChosenKeywords.splice(chosenKeywords.indexOf(keyword), 1);
    setChosenKeywords(newChosenKeywords);
  };

  return (
    <div id="border" className={"flex gap-x-2 flex-wrap"}>
      <h1 id="title">Add Keywords</h1>{" "}
      {selected === "~" ? (
        <div className={"flex flex-col w-full items-end"}>
          <div
            id={"border"}
            className={"w-full flex justify-between items-center relative"}
          >
            {" "}
            <label className={"pl-1 w-full"}>Enter Keyword:</label>
            <input
              className={"w-full"}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />{" "}
            <div
              id="close-dr"
              className="absolute"
              onClick={() => setSelected("")}
            ></div>
          </div>
          <button
            className={"w-1/4"}
            id="button"
            type="button"
            onClick={() => {
              addChosenKeyword(input);
              setSelected("");
              setInput("");
            }}
          >
            Add
          </button>
        </div>
      ) : (
        <select
          value={selected}
          onChange={(e) => {
            addChosenKeyword(e.target.value);
          }}
          className={"w-full Border"}
        >
          <option value={""} disabled>
            -- Select Keywords --
          </option>
          <option value="~">-- New Keyword --</option>
          {keywords.map((keyword) => {
            if (!chosenKeywords.includes(keyword))
              return (
                <option value={keyword} key={keyword}>
                  {keyword}
                </option>
              );
          })}
        </select>
      )}{" "}
      {chosenKeywords.map((keyword) => {
        return (
          <div
            className={"Keyword"}
            key={keyword}
            onClick={() => {
              if (chosenKeywords.includes(keyword)) {
                removeChosenKeyword(keyword);
              }
            }}
          >
            <input value={keyword} name="keywords" hidden onChange={() => {}} />
            {keyword}
          </div>
        );
      })}
    </div>
  );
}
