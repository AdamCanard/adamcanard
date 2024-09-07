export default function BeerLabel(props: { title: string; data: string }) {
  return (
    <label>
      {props.title}:
      <div className="border-2 border-black w-64 ">{props.data}</div>
    </label>
  );
}
