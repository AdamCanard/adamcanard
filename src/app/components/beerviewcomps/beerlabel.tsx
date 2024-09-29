export default function BeerLabel(props: { title: string; data: string }) {
  return (
    <label id="border" className="flex justify-between w-72">
      {props.title}:<div>{props.data}</div>
    </label>
  );
}
