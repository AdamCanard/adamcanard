import { useContext } from "react";
import { BeerData } from "../../types";
import { TaskbarContext } from "../sitecomps/toplevel";

export default function Delete(props: { beer: BeerData; close: () => void }) {
  const { setRefreshBeers } = useContext(TaskbarContext);
  const deleteBeer = async () => {
    const formData = new FormData();
    formData.append("id", props.beer.id);
    try {
      const response = await fetch("/api/deletebeer/", {
        method: "POST",
        body: formData,
      });
      const beerData = await response.json();
      return beerData;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          }
        );
      } else {
        console.log(err);
      }
    }
  };

  const handleClick = async () => {
    await deleteBeer();
    props.close();
    setRefreshBeers(true);
  };

  return (
    <div id="border" onClick={handleClick}>
      Delete
    </div>
  );
}
