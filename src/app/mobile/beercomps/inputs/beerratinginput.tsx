import { useState } from "react";

export default function BeerRatingInput() {
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
