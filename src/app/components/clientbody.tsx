import List from "./list";
import Suggestion from "./suggestion";

export default function ClientBody() {
  return (
    <div className="grid grid-cols-2 grid-rows-3 w-full h-full gap-x-2">
      <div className="col-span-1 row-span-2">
        <List Title="Drank" />
      </div>
      <div className="col-span-1 row-span-2">
        <List Title="Drink" />
      </div>

      <div className="row-span-1 col-span-2 ">
        <Suggestion />
      </div>
    </div>
  );
}
