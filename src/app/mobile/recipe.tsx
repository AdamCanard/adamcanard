import { IRecipe } from "@/app/server/models/recipe";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function Recipe() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const getRecipes = useCallback(async () => {
    try {
      const response = await fetch("/api/recipe/", {
        method: "GET",
      });
      const listResponse = await response.json();

      setRecipes(listResponse.toReversed());

      return listResponse;
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
  }, []);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/recipe/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const newRecipes = [...recipes];
      newRecipes.push(data.returnedRecipe);
      setRecipes(newRecipes);
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
    <div className={"w-full h-full"}>
      <RecipeForm handleSubmit={handleSubmit} />
      <RecipeList recipes={recipes} />
    </div>
  );
}
function RecipeForm(props: {
  handleSubmit: (arg0: FormEvent<HTMLFormElement>) => void;
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  return (
    <form
      id="border"
      onSubmit={(e) => {
        props.handleSubmit(e);
        setName("");
        setUrl("");
      }}
      className={"flex flex-col"}
    >
      <div id={"border"} className={"w-full flex justify-between items-center"}>
        <label className={"pl-1 w-full"}>Recipe Name:</label>
        <input
          className={"w-full bg-white"}
          name={"name"}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
      </div>{" "}
      <div id={"border"} className={"w-full flex justify-between items-center"}>
        <label className={"pl-1 w-full"}>Recipe URL:</label>
        <input
          className={"w-full bg-white"}
          name="url"
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          required
        />
      </div>
      <button id="button" className={"cursor-pointer"}>
        Add Recipe
      </button>
    </form>
  );
}
function RecipeList(props: { recipes: IRecipe[] }) {
  return (
    <div id="border" className={"flex flex-col overflow-y-auto"}>
      {props.recipes.map((recipe) => {
        return (
          <Link
            id="border"
            className={"w-full"}
            key={recipe.url}
            href={recipe.url}
          >
            {recipe.name}
          </Link>
        );
      })}
    </div>
  );
}
