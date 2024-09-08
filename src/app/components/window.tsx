export default function Window(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 id="title" className="w-full">
        {props.title}
      </h1>
      <div id="window" className="w-full">
        {props.children}
      </div>
    </div>
  );
}
