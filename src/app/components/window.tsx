export default function Window(props: {
  title: string;
  children: React.ReactNode;
  close?: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between w-full">
        <h1 id="title">
          {props.title}
          {props.close && <div id="close" onClick={props.close}></div>}
        </h1>
      </div>

      <div id="window">{props.children}</div>
    </div>
  );
}
