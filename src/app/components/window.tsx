export default function Window(props: {
  title: string;
  children: React.ReactNode;
  close?: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {props.close ? (
        <div className="flex justify-between w-full">
          <h1 id="title" className="w-full">
            {props.title}
            <div id="close" onClick={props.close}></div>
          </h1>
        </div>
      ) : (
        <h1 id="title" className="w-full">
          {props.title}
        </h1>
      )}

      <div id="window" className="w-full">
        {props.children}
      </div>
    </div>
  );
}
