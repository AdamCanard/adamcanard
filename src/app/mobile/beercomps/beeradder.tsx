import { FormEvent, useContext, useState } from "react";
import { BeerContext } from "../beer";

const fileToB64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function BeerAdder() {
  const { back } = useContext(BeerContext);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const image = await fileToB64(formData.get("image") as File);
    console.log(image as string);
    formData.set("image", image as string);
    try {
      const response = await fetch("/api/beer/", {
        method: "POST",
        body: formData,
      });
      return await response.json();
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
  };
  return (
    <div className={"w-full h-full flex flex-col"}>
      <form id="border" className={"flex flex-col"} onSubmit={handleSubmit}>
        <BeerImageInput />
        <div className="flex justify-between w-full relative h-8">
          <h1 id="title" className="w-full">
            Enter Beer Info:
          </h1>
          <div id="close-dr" className="absolute" onClick={back}></div>
        </div>
        <div className={"w-full"}>
          <LabeledBeerInput
            label="Name"
            name="name"
            type="text"
            required={true}
          />
          <BrewerySelect />
          <RatingInput />
          <LabeledBeerInput label="Suggested" name="recommended" type="text" />
        </div>
        <KeywordSelect />
        <BeerDesc />
        <button>handleSubmit</button>
      </form>
    </div>
  );
}

function BeerImageInput() {
  return (
    <div id="border" className={" flex-col flex"}>
      {" "}
      <div className="flex justify-between w-full relative h-8">
        <h1 id="title" className="w-full">
          Add Photo of Beer:
        </h1>
      </div>
      <input className={"Border"} name="image" type="file" />
    </div>
  );
}

function BeerDesc() {
  return (
    <div id="border" className={" flex-col flex"}>
      {" "}
      <div className="flex justify-between w-full relative h-8">
        <h1 id="title" className="w-full">
          Enter Beer Description:
        </h1>
      </div>
      <textarea name="desc" className={"h-32"} />
    </div>
  );
}

function KeywordSelect() {
  const [selected, setSelected] = useState("");
  const [input, setInput] = useState("");
  const [chosenKeywords, setChosenKeywords] = useState<string[]>([]);
  const { beers } = useContext(BeerContext);
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
          <option value={""} disabled selected>
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
            <input value={keyword} name="keywords" hidden />
            {keyword}
          </div>
        );
      })}
    </div>
  );
}

function LabeledBeerInput(props: {
  type: string;
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div id={"border"} className={"w-full flex justify-between items-center"}>
      <label className={"pl-1 w-full"}>{props.label}:</label>
      {props.required ? (
        <input
          className={"w-full"}
          type={props.type}
          name={props.name}
          required
        />
      ) : (
        <input className={"w-full"} type={props.type} name={props.name} />
      )}
    </div>
  );
}
function RatingInput() {
  const [rating, setRating] = useState(0);
  const changeRating = (newRating: number) => {
    if (newRating > 0 && newRating <= 10) {
      setRating(newRating);
    }
  };
  return (
    <div id={"border"} className={"w-full flex justify-between items-center"}>
      <label className={"pl-1 w-full"}>Rating:</label>
      <input
        className={"w-full"}
        type="number"
        name={"rating"}
        value={rating}
        onChange={(e) => changeRating(+e.target.value)}
      />{" "}
    </div>
  );
}

function BrewerySelect() {
  const { beers } = useContext(BeerContext);
  const [selected, setSelected] = useState("");
  const breweries = [...new Set(beers.map((beer) => beer.brewery))];
  return (
    <div id={"border"} className={"w-full flex justify-between items-center"}>
      <label className={"pl-1 w-full"}>Brewery:</label>
      {selected === "~" ? (
        <div className={"w-full relative"}>
          {" "}
          <input className={"w-full"} type="text" name="brewery" />{" "}
          <div
            id="close-dr"
            className="absolute"
            onClick={() => setSelected("")}
          ></div>
        </div>
      ) : (
        <select
          name={"brewery"}
          className={"w-full Border"}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          required
        >
          <option value={""} disabled selected>
            -- Select a Brewery --
          </option>
          <option value="~">-- New Brewery --</option>
          {breweries.map((brewery) => {
            return (
              <option value={brewery} key={brewery}>
                {brewery}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
}
