import { ISuggestion } from "../types";

export default function SuggestionListElement(props: { data: ISuggestion }) {
  const Accept = async () => {};
  const Deny = async () => {};
  return (
    <div className="flex flex-row pr-1">
      <div
        id="border"
        className="flex w-full h-8 justify-between items-center p-2 gap-2 "
      >
        <>
          <div>{props.data.Beer}</div>
          <div>{props.data.Brewery}</div>
          <div>{props.data.Email}</div>
        </>
      </div>
      <div className="flex flex-row w-20 h-8 gap-1">
        <div id="accept" onClick={Accept}></div>
        <div id="deny" onClick={Deny}></div>
      </div>
    </div>
  );
}
