export default function BeerImageInput() {
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
