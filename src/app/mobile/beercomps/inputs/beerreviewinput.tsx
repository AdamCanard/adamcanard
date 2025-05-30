export default function BeerReviewInput() {
  return (
    <div id="border" className={" flex-col flex"}>
      {" "}
      <div className="flex justify-between w-full relative h-8">
        <h1 id="title" className="w-full">
          Beer Review:
        </h1>
      </div>
      <input type={"url"} name={"review"} />
    </div>
  );
}
