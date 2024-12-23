import DesktopWindow from "../sitecomps/desktopwindow";

export default function ListWindow(props: {
  api: string;
  data: object;
  id: string;
}) {
  console.log(props.data);
  const keys = Object.keys(props.data);
  return (
    <DesktopWindow
      title={Object.values(props.data)[0]}
      width={"16rem"}
      height={""}
    >
      {Object.values(props.data).map((data, index: number) => {
        if (!Omit.includes(keys[index])) {
          return (
            <div
              id="border"
              className="flex w-full h-full justify-between items-center p-3"
              key={index + props.id}
            >
              {data !== "" && (data as string)}
            </div>
          );
        }
      })}
    </DesktopWindow>
  );
}

const Omit = ["collectionId", "collectionName", "id", "created", "updated"];
